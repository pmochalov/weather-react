class PWeather {

    #url = "https://api.openweathermap.org/data/2.5/";

    constructor(options) {
        this._key = options.key;
        this._city = options.city;
        this._forecastId = 2; // short forecast = 1, detailed = 2

        this.$tabs = document.querySelector('.tabs');

        this.#render();
    }

    async #getForecast(url) {
        let response = await fetch(url);

        let data = await response.json();
        return data;
    }

    #createUrl(key = 'intro') {
        const apiUrls = {
            intro: `${this.#url}weather?units=metric&lang=ru&q=${this._city}&apikey=${this._key}`,
            short: `${this.#url}forecast/daily?q=${this._city}&units=metric&lang=ru&cnt=8&appid=${this._key}`,
            detailed: `${this.#url}forecast?units=metric&lang=ru&q=${this._city}&appid=${this._key}`
        };

        return apiUrls[key];
    }

    renderIntroForecast(data) {
        mainDate.innerHTML = getDateTxt(new Date().getTime() / 1000);
        mainTemp.innerHTML = getTempTxt(data.main.temp) + '&deg;C';
        mainWeatherImg.innerHTML = `<figure class="icon-${data.weather[0].icon}"></figure></div>`;
        mainWeatherDesc.innerHTML = data.weather[0].description;
        mainWeatherPressure.innerHTML = `${Math.round(data.main.pressure * 0.75)} мм.рт.ст`;
        mainWeatherWind.innerHTML = `${getWindTitle(data.wind.deg)}, ${Math.round(data.wind.speed)} м/с`;
        mainWeatherHydro.innerHTML = `${data.main.humidity} %`;
        mainWeatherSunrise.innerHTML = 'Восход: ' + getTimeTxt(data.sys.sunrise);
        mainWeatherSunset.innerHTML = 'Закат: ' + getTimeTxt(data.sys.sunset);
    }

    renderShortForecast(data) { // Short forecast
        tabsContent.innerHTML = '';

        let tabsCards = document.createElement('div');
        tabsCards.classList.add('tabs__cards');
        tabsContent.append(tabsCards);

        for (let i = 0; i < data.list.length; i++) {
            tabsCards.append(this.renderShortCard(data.list[i]));
        }
    }

    renderDetailedForecast(data) { // Deteiled forecast
        let formatResponse = [];

        for (let item of data.list) {
            let itemDate = new Date(item.dt * 1000);
            let keyDate = +new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()) / 1000;

            if (formatResponse[keyDate] === undefined) {
                formatResponse[keyDate] = [];
            }

            formatResponse[keyDate].push(item);
        }
        tabsContent.innerHTML = '';

        for (let key in formatResponse) {
            let dateBlock = document.createElement('div'); // Дата
            dateBlock.classList.add('date');
            dateBlock.innerHTML = getDateTxt(key, true);
            tabsContent.append(dateBlock);

            let tabsBlock = document.createElement('div'); // Блок с карточками
            tabsBlock.classList.add('tabs__cards');
            tabsContent.append(tabsBlock);

            for (let i = 0; i < formatResponse[key].length; i++) {
                tabsBlock.append(this.renderDetailedCard(formatResponse[key][i]));
            }
        }
    }

    renderShortCard(data) { // Card of short forecast
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(this.#getCardBg(data.temp.max));

        card.innerHTML = `<div class="card__date">${getDateTxt(data.dt)}</div>`;
        card.innerHTML += `<div class="card__icon"><figure class="icon-${data.weather[0].icon}"></figure></div>`;
        card.innerHTML += `<div class="card__temp">${getTempTxt(data.temp.max)}</div>`;
        card.innerHTML += `<div class="card__item">${getTempTxt(data.temp.min)}</div>`;
        card.innerHTML += `<div class="card__item">${data.weather[0].description}</div>`;
        card.innerHTML += `<div class="card__item">${data.humidity} %</div>`;
        card.innerHTML += `<div class="card__item">${Math.round(data.pressure * 0.75)} мм.рт.ст</div>`;
        card.innerHTML += `<div class="card__item">${getWindTitle(data.deg)}, ${Math.round(data.speed)} м/с</div>`;

        return card;
    }

    renderDetailedCard(data) { // Card of detailed forecast
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(this.#getCardBg(data.main.temp_max));

        card.innerHTML = `<div class="card__date">${getTimeTxt(data.dt)}</div>`;
        card.innerHTML += `<div class="card__icon"><figure class="icon-${data.weather[0].icon}"></figure></div>`;
        card.innerHTML += `<div class="card__temp">${getTempTxt(data.main.temp_max)}</div>`;
        card.innerHTML += `<div class="card__item">${getTempTxt(data.main.temp_min)}</div>`;
        card.innerHTML += `<div class="card__item">${data.weather[0].description}</div>`;
        card.innerHTML += `<div class="card__item">${data.main.humidity} %</div>`;
        card.innerHTML += `<div class="card__item">${Math.round(data.main.pressure * 0.75)} мм.рт.ст</div>`;
        card.innerHTML += `<div class="card__item">${getWindTitle(data.wind.deg)}, ${Math.round(data.wind.speed)} м/с</div>`;

        return card;
    }

    #getCardBg(value) {
        let temperature = Math.floor(value);

        if (temperature < 0) {
            return `tbgcolor-min${Math.round(temperature)}`;
        } else if (temperature > 0) {
            return `tbgcolor-max-${Math.round(temperature)}`;
        }

        return `tbgcolor-0`;
    }

    setTabsState() { // Set tabs state
        let tabsMenu = this.$tabs.querySelector('.tabs__menu');

        for (let tab of tabsMenu.children) {
            if (tab.dataset.forecastId == this._forecastId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        }
    }

    async setTabsContent() {
        if (this._forecastId == 1) {
            let data = await this.#getForecast(this.#createUrl('short'));
            this.renderShortForecast(data);
        } else if (this._forecastId == 2) {
            let data = await this.#getForecast(this.#createUrl('detailed'));
            this.renderDetailedForecast(data);
        }
    }

    async #render() { // Render of the page
        this.setTabsState();
        this.setTabsContent();

        this.clickTabs = this.clickTabs.bind(this);
        this.$tabs.addEventListener('click', this.clickTabs)

        this.renderIntroForecast(await this.#getForecast(this.#createUrl('intro')));
    }

    clickTabs(event) {
        if (event.target.hasAttribute('data-forecast-id')) {
            this._forecastId = +event.target.dataset.forecastId;
            this.setTabsState();
            this.setTabsContent();
        }
    }

}

let w = new PWeather({
    city: "Архангельск",
    key: "d9e9e82523b9a0f692dcf8d361dc97c4"
});


const windsArr = [
    {
        start: 0,
        end: 22.5,
        value: "C"
    },
    {
        start: 22.5,
        end: 45,
        value: "ССВ"
    },
    {
        start: 45,
        end: 67.5,
        value: "СВ"
    },
    {
        start: 67.5,
        end: 90,
        value: "ВСВ"
    },
    {
        start: 90,
        end: 112.5,
        value: "В"
    },
    {
        start: 112.5,
        end: 135,
        value: "ВЮВ"
    },
    {
        start: 135,
        end: 157.5,
        value: "ЮВ"
    },
    {
        start: 157.5,
        end: 180,
        value: "ЮЮВ"
    },
    {
        start: 180,
        end: 202.5,
        value: "Ю"
    },
    {
        start: 202.5,
        end: 225,
        value: "ЮЮЗ"
    },
    {
        start: 225,
        end: 247.5,
        value: "ЮЗ"
    },
    {
        start: 247.5,
        end: 270,
        value: "ЗЮЗ"
    },
    {
        start: 270,
        end: 292.5,
        value: "З"
    },
    {
        start: 292.5,
        end: 315,
        value: "ЗСЗ"
    },
    {
        start: 315,
        end: 337.5,
        value: "СЗ"
    },
    {
        start: 337.5,
        end: 360,
        value: "ССЗ"
    }
];

const getWindTitle = (deg) => { // Returns converted the wind angle to the wind title
    let wind = windsArr.find((el) => {
        if (el.end == 360) {
            return (deg >= el.start && deg <= el.end);
        }
        return (deg >= el.start && deg < el.end);
    })

    return wind.value;
}

const getDateTxt = (value, showTodayTxt = false) => { // Returns the name of the date
    let date = new Date(value * 1000);
    const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const DAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    let now = new Date();

    if (now.getDate() == date.getDate() && showTodayTxt == true) {
        return `Сегодня`;
    }

    return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${DAYS[date.getDay()]}`;
}

const getTimeTxt = (value) => { // Returns the time in format: ##:##
    let datetime = new Date(value * 1000);
    let hours = datetime.getHours();
    let minutes = (datetime.getMinutes() < 10) ? `0${datetime.getMinutes()}` : datetime.getMinutes();

    return `${hours}:${minutes}`;
}

const getTempTxt = (value) => { // Returns formatted temperature value (+/- or nothing, if value == 0)
    let temp = Math.round(value);

    if (temp < 0) {
        return `&minus;${Math.abs(temp)}`;
    } else if (temp > 0) {
        return `&plus;${temp}`;
    }
    return `${temp}`;
}
