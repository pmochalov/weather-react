'use strict'

const KEY = "d9e9e82523b9a0f692dcf8d361dc97c4";

const tabs = document.querySelectorAll('.tabs');
const tabsMenu = document.querySelectorAll('.tabs__menu > li');
const tabsBlocks = document.querySelectorAll('.tabs__content > .tabs__block');

const shortForecast = document.querySelector('#shortForecast');
const detailedForecast = document.querySelector('#detailedForecast');


// Вкладки
for (let i = 0; i < tabsMenu.length; i++) {

    tabsMenu[i].addEventListener('click', function () {
        let currIndex = i;

        for (let k = 0; k < tabsMenu.length; k++) {
            if (currIndex == k) {
                tabsMenu[k].classList.add('active');
            } else {
                tabsMenu[k].classList.remove('active');
            }
        }

        for (let j = 0; j < tabsBlocks.length; j++) {
            if (currIndex == j) {
                tabsBlocks[j].style.display = 'block';
            } else {
                tabsBlocks[j].style.display = 'none';
            }
        }

    });

}


// Прогноз погоды

// Подробный
// http://api.openweathermap.org/data/2.5/forecast?units=metric&q=Архангельск&appid=d9e9e82523b9a0f692dcf8d361dc97c4 



// Прогноз в блоке 'intro'

const mainUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=Архангельск&apikey=${KEY}`;

fetch(mainUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        mainDate.innerHTML = getDateTxt(new Date().getTime() / 1000);
        mainTemp.innerHTML = getTempTxt(data.main.temp);
        mainWeatherImg.innerHTML = `<figure class="icon-${data.weather[0].icon}"></figure></div>`;
        mainWeatherDesc.innerHTML = data.weather[0].description;
        mainWeatherPressure.innerHTML = `${Math.round(data.main.pressure * 0.75)} мм.рт.ст`;
        mainWeatherWind.innerHTML = `${getWindName(data.wind.deg)}, ${Math.round(data.wind.speed)} м/с`;
        mainWeatherHydro.innerHTML = `${data.main.humidity} %`;
        mainWeatherSunrise.innerHTML = 'Восход: ' + getTime(data.sys.sunrise);
        mainWeatherSunset.innerHTML = 'Закат: ' + getTime(data.sys.sunset);
    });


// Краткий прогноз

const shortForecastUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=Архангельск&units=metric&lang=ru&cnt=8&appid=${KEY}`;

fetch(shortForecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // console.log(data);

        let list = data.list;

        let tabsBlock = document.createElement('div');
        tabsBlock.classList.add('tabs__cards');

        shortForecast.append(tabsBlock);

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
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


// Подробный прогноз
const detailedForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric&q=Архангельск&appid=${KEY}`;

console.log(detailedForecastUrl);

fetch(detailedForecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        let formatList = {};
        let controlDate;

        for (let item of data.list) {
            console.log(item)
            // let itemDate = new Date(item.dt * 1000);
            // let key = `${itemDate.getDate()}` + `${itemDate.getMonth()}` + `${itemDate.getFullYear()}`;

            // if (formatList[key] === undefined) {
            //     formatList[key] = [];
            // }

            // formatList[key].push(item);

            if (controlDate === undefined || controlDate !== new Date(item.dt * 1000).getDate()) {
                controlDate = new Date(item.dt * 1000).getDate();

                let dateBlock = document.createElement('div');
                dateBlock.classList.add('date');
                dateBlock.innerHTML = getDateTxt(item.dt);
                detailedForecast.append(dateBlock);

                let tabsBlock = document.createElement('div');
                tabsBlock.classList.add('tabs__cards');

                detailedForecast.append(tabsBlock);

                let card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `<div class="card__date">${item.dt}</div>`;

                tabsBlock.append(card);

            } else {
                let tabsBlock
            }


        }

        // console.log(formatList);
    });


// Возвращает класс фона для температуры
function getCardBg(temperature) {

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

    if (value < 0) {
        return `&minus;${Math.abs(temp)}`
    } else if (value > 0) {
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


// let response = fetch(url, {});

// response.then(function(e){
//     console.log(e.ok, e.status);
//     // console.dir(e)
//     let r = e.json();
//     console.log(r)
// })




////////////////////

//   <div class="card tbgcolor-max-10">
//   <div class="card__date">
//       19 августа, пт
//   </div>
//   <div class="card__icon">
//       <figure class="icon-02d"></figure>
//   </div>
//   <div class="card__temp">
//       +10
//   </div>
//   <div class="card__item">
//       рассеяные облака
//   </div>
//   <div class="card__item">
//       761 мм.рт.ст
//   </div>        
//   <div class="card__item">
//       96%                            
//   </div> 
//   <div class="card__item">
//       ВЮВ, 2 м/с
//   </div>               
// </div>

















/////////////////////



            // console.group("Дата: " + getDateTxt(item.dt));    
            //     console.log("weatherId: " + item.weather[0].id);
            //     console.log("Icon: " + item.weather[0].icon);
            //     console.log("mainDesc: " + item.weather[0].main);
            //     console.log("Description: " + item.weather[0].description);
            //     console.log("----")
            //     console.log("t.min: " + Math.round(item.temp.min) + " " + "t.max: " + Math.round(item.temp.max) );
            //     console.log("влажность: " + item.humidity);
            //     console.log("давление: " + Math.round(item.pressure * 0.75));
            //     console.log("ветер: " + Math.round(item.speed) + " / deg: " + item.deg + " / : " + getWindName(itemDeg));
            //     console.log(item);
            // console.groupEnd();




//////////////

        // Описание погоды
        // function pogoda($code = NULL) 
        // {
        //     $w_conds = array();

        //     // гроза
        //     $w_conds['200'] = "гроза, небольшой дождь";
        //     $w_conds['201'] = "гроза, дождь";
        //     $w_conds['202'] = "гроза, сильный дождь";
        //     $w_conds['210'] = "небольшая гроза";
        //     $w_conds['211'] = "гроза";
        //     $w_conds['212'] = "сильная гроза";
        //     $w_conds['221'] = "возможно гроза";
        //     $w_conds['230'] = "гроза, морось";
        //     $w_conds['231'] = "гроза, мелкий дождь";
        //     $w_conds['232'] = "гроза, сильная морось";

        //     // ливни
        //     $w_conds['300'] = "легкая изморось";
        //     $w_conds['301'] = "изморось";
        //     $w_conds['302'] = "сильная изморось";
        //     $w_conds['310'] = "легкая изморось, дождь";
        //     $w_conds['311'] = "моросящий дождь";
        //     $w_conds['312'] = "дождь";
        //     $w_conds['313'] = "дождь, ливень";
        //     $w_conds['314'] = "моросящий дождь, ливень";
        //     $w_conds['321'] = "ливень";

        //     // дождь
        //     $w_conds['500'] = "слабый дождь";
        //     $w_conds['501'] = "небольшой дождь";
        //     $w_conds['502'] = "сильный дождь";
        //     $w_conds['503'] = "очень сильный дождь";
        //     $w_conds['504'] = "экстремальный дождь";
        //     $w_conds['511'] = "ледяной дождь";
        //     $w_conds['520'] = "ливень";
        //     $w_conds['521'] = "сильный ливень";
        //     $w_conds['522'] = "очень сильный ливень";
        //     $w_conds['531'] = "порывистый сильный ливень";

        //     // снег
        //     $w_conds['600'] = "небольшой снег";
        //     $w_conds['601'] = "снег";
        //     $w_conds['602'] = "снегопад";
        //     $w_conds['611'] = "дождь со снегом";
        //     $w_conds['612'] = "сильный мокрый снег";
        //     $w_conds['615'] = "небольшой дождь и снег";
        //     $w_conds['616'] = "дождь и снег";
        //     $w_conds['620'] = "мокрый снег";
        //     $w_conds['621'] = "сильный мокрый снег";
        //     $w_conds['622'] = "порывистый сильный мокрый снег";

        //     // атмосфера
        //     $w_conds['701'] = "туман";
        //     $w_conds['711'] = "дым";
        //     $w_conds['721'] = "мгла";
        //     $w_conds['731'] = "песок, потоки пыли";
        //     $w_conds['741'] = "туман";
        //     $w_conds['751'] = "песок";
        //     $w_conds['761'] = "пыль";
        //     $w_conds['762'] = "вулканический пепел";
        //     $w_conds['771'] = "шквалы";
        //     $w_conds['781'] = "торнадо";

        //     // очистить
        //     $w_conds['800'] = "ясно";

        //     $w_conds['801'] = "редкие облака";
        //     $w_conds['802'] = "рассеянные облака";
        //     $w_conds['803'] = "переменная облачность";
        //     $w_conds['804'] = "пасмурно";

        //     // экстремальные
        //     $w_conds['900'] = "торнадо";
        //     $w_conds['901'] = "тропическая буря";
        //     $w_conds['902'] = "ураган";
        //     $w_conds['903'] = "холодно";
        //     $w_conds['904'] = "жарко";
        //     $w_conds['905'] = "ветрено";
        //     $w_conds['906'] = "град";

        //     $w_conds['951'] = "спокойно";
        //     $w_conds['952'] = "легкий ветер";
        //     $w_conds['953'] = "легкий бриз";
        //     $w_conds['954'] = "умеренный ветер";
        //     $w_conds['955'] = "свежий ветер";
        //     $w_conds['956'] = "сильный ветер";
        //     $w_conds['957'] = "сильный ветер, близкий к штормовому";
        //     $w_conds['958'] = "штормовой ветер";
        //     $w_conds['959'] = "серьезный ураган";
        //     $w_conds['960'] = "буря";
        //     $w_conds['961'] = "сильный шторм";
        //     $w_conds['962'] = "ураган";   

        //     return $w_conds[ $code ];
        // }