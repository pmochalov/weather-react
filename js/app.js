const KEY = "d9e9e82523b9a0f692dcf8d361dc97c4";
const CITY = "Архангельск";

const tabsMenu = document.querySelectorAll('.tabs__menu > li');
const tabsContent = document.querySelector('#tabsContent > .tabs__block');

let forecastId = 1;

// Загрузка прогноза по-умолчанию
window.onload = function () {

    getIntroForecast();

    getForecast();

};


// Вкладки
for (let i = 0; i < tabsMenu.length; i++) {

    if (forecastId == i + 1) {
        tabsMenu[i].classList.add('active');
    }

    tabsMenu[i].addEventListener('click', function () {

        forecastId = tabsMenu[i].dataset.forecastId;

        for (let k = 0; k < tabsMenu.length; k++) {
            if (i == k) {
                tabsMenu[k].classList.add('active');
                getForecast();

            } else {
                tabsMenu[k].classList.remove('active');
            }
        }

    });

}


// Загрузить прогноз погоды
function getForecast() {

    tabsContent.innerHTML = '';

    switch (forecastId) {
        case '1':
            getShortForecast();
            break;
        case '2':
            getDetailedForecast();
            break;
        default:
            getShortForecast();
    }

}


// Интро-прогноз
function getIntroForecast() {

    const mainUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=${CITY}&apikey=${KEY}`;

    fetch(mainUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            mainDate.innerHTML = getDateTxt(new Date().getTime() / 1000);
            mainTemp.innerHTML = getTempTxt(data.main.temp) + '&deg;C';
            mainWeatherImg.innerHTML = `<figure class="icon-${data.weather[0].icon}"></figure></div>`;
            mainWeatherDesc.innerHTML = data.weather[0].description;
            mainWeatherPressure.innerHTML = `${Math.round(data.main.pressure * 0.75)} мм.рт.ст`;
            mainWeatherWind.innerHTML = `${getWindName(data.wind.deg)}, ${Math.round(data.wind.speed)} м/с`;
            mainWeatherHydro.innerHTML = `${data.main.humidity} %`;
            mainWeatherSunrise.innerHTML = 'Восход: ' + getTime(data.sys.sunrise);
            mainWeatherSunset.innerHTML = 'Закат: ' + getTime(data.sys.sunset);
        });
}


// Краткий прогноз
function getShortForecast() {

    const shortForecastUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${CITY}&units=metric&lang=ru&cnt=8&appid=${KEY}`;

    fetch(shortForecastUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            let tabsCards = document.createElement('div');
            tabsCards.classList.add('tabs__cards');
            tabsContent.append(tabsCards);

            // Карточки
            let tabsBlock = document.createElement('div');
            tabsBlock.classList.add('tabs__cards');
            tabsContent.append(tabsBlock);

            for (let i = 0; i < data.list.length; i++) {

                let item = data.list[i];
                let card = document.createElement('div');
                card.classList.add('card');
                card.classList.add(getCardBg(item.temp.max));

                card.innerHTML = `<div class="card__date">${getDateTxt(item.dt)}</div>`;
                card.innerHTML += `<div class="card__icon"><figure class="icon-${item.weather[0].icon}"></figure></div>`;
                card.innerHTML += `<div class="card__temp">${getTempTxt(item.temp.day)}</div>`;
                card.innerHTML += `<div class="card__item">${getTempTxt(item.temp.night)}</div>`;
                card.innerHTML += `<div class="card__item">${item.weather[0].description}</div>`;
                card.innerHTML += `<div class="card__item">${item.humidity} %</div>`;
                card.innerHTML += `<div class="card__item">${getWindName(item.deg)}, ${Math.round(item.speed)} м/с</div>`;

                tabsBlock.append(card);
            }
        });
}


// Подробный прогноз
function getDetailedForecast() {

    const detailedForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&q=${CITY}&appid=${KEY}`;

    fetch(detailedForecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            let formatResponse = {};

            for (let item of data.list) {

                let itemDate = new Date(item.dt * 1000);
                let keyDate = +new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()) / 1000;

                if (formatResponse[keyDate] === undefined) {
                    formatResponse[keyDate] = [];
                }

                formatResponse[keyDate].push(item);
            }

            return formatResponse;
        })
        .then(function (data) {

            for (let key in data) {

                // Дата
                let dateBlock = document.createElement('div');
                dateBlock.classList.add('date');
                dateBlock.innerHTML = getDateTxt(key);
                tabsContent.append(dateBlock);

                // Карточки
                let tabsBlock = document.createElement('div');
                tabsBlock.classList.add('tabs__cards');
                tabsContent.append(tabsBlock);

                for (let i = 0; i < data[key].length; i++) {
                    let item = data[key][i];
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.classList.add(getCardBg(item.main.temp_max));

                    card.innerHTML = `<div class="card__date">${getTime(item.dt)}</div>`;
                    card.innerHTML += `<div class="card__icon"><figure class="icon-${item.weather[0].icon}"></figure></div>`;
                    card.innerHTML += `<div class="card__temp">${getTempTxt(item.main.temp_max)}</div>`;
                    card.innerHTML += `<div class="card__item">${getTempTxt(item.main.temp_min)}</div>`;
                    card.innerHTML += `<div class="card__item">${item.weather[0].description}</div>`;
                    card.innerHTML += `<div class="card__item">${item.main.humidity} %</div>`;
                    card.innerHTML += `<div class="card__item">${getWindName(item.wind.deg)}, ${Math.round(item.wind.speed)} м/с</div>`;

                    tabsBlock.append(card);
                }

            }
        });
}


// Возвращает класс фона для температуры
function getCardBg(value) {

    let temperature = Math.floor(value);

    if (temperature < 0) {
        return `tbgcolor-min${Math.round(temperature)}`
    } else if (temperature > 0) {
        return `tbgcolor-max-${Math.round(temperature)}`
    } else {
        return `tbgcolor-0`
    }

}


// Возвращает час 
function getTime(value) {
    let datetime = new Date(value * 1000);

    let hours = datetime.getHours();
    let minutes = (datetime.getMinutes() < 10) ? `0${datetime.getMinutes()}` : datetime.getMinutes();

    return `${hours}:${minutes}`;
}


// Возвращает текстовое представление температуры для отображения в карточке
function getTempTxt(value) {

    let temp = Math.round(value);

    if (temp < 0) {
        return `&minus;${temp}`
    } else if (temp > 0) {
        return `&plus;${temp}`
    } else {
        return `${temp}`
    }

}


// Возвращает текстовое представление даты
function getDateTxt(value) {

    let d = new Date(value * 1000);

    const MONTHS = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    const WDAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

    return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${WDAYS[d.getDay()]}`;
}


// Возвращает строку с названием ветра
function getWindName(deg) {

    if (deg >= 0 && deg < 22.5) { return "С" }
    else if (deg >= 22.5 && deg < 45) { return "ССВ" }
    else if (deg >= 45 && deg < 67.5) { return "СВ" }
    else if (deg >= 67.5 && deg < 90) { return "ВСВ" }
    else if (deg >= 90 && deg < 112.5) { return "В" }
    else if (deg >= 112.5 && deg < 135) { return "ВЮВ" }
    else if (deg >= 135 && deg < 157.5) { return "ЮВ" }
    else if (deg >= 157.5 && deg < 180) { return "ЮЮВ" }
    else if (deg >= 180 && deg < 202.5) { return "Ю" }
    else if (deg >= 202.5 && deg < 225) { return "ЮЮЗ" }
    else if (deg >= 225 && deg < 247.5) { return "ЮЗ" }
    else if (deg >= 247.5 && deg < 270) { return "ЗЮЗ" }
    else if (deg >= 270 && deg < 292.5) { return "З" }
    else if (deg >= 292.5 && deg < 315) { return "ЗСЗ" }
    else if (deg >= 315 && deg < 337.5) { return "СЗ" }
    else if (deg >= 337.5 && deg <= 360) { return "ССЗ" }
    else { return "" }

}

