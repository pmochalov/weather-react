
export const getWind = (deg) => {
    if (!deg) return;

    const wind = windsArr.find((w) => {
        if (w.end == 360) {
            return (deg >= w.start && deg <= w.end);
        }
        return (deg >= w.start && deg < w.end);
    })

    return wind.value;
}

export const getDateTxt = (value, showTodayTxt = false) => {
    if (!value) return;

    const date = new Date(value * 1000);
    const now = new Date();

    if (now.getDate() == date.getDate() && showTodayTxt == true) {
        return `Сегодня`;
    }

    return `${date.getDate()} ${monthsArr[date.getMonth()]}, ${daysArr[date.getDay()]}`;
}

export const getTempTxt = (value) => {
    if (!value) return;

    const temp = Math.round(value);

    if (temp < 0) {
        return `- ${Math.abs(temp)}`;
    } else if (temp > 0) {
        return `+ ${temp}`;
    }
    return `${temp}`;
}


export const getTimeTxt = (value) => {
    if (!value) return;

    const datetime = new Date(value * 1000);
    const hours = datetime.getHours();
    const minutes = (datetime.getMinutes() < 10) ? `0${datetime.getMinutes()}` : datetime.getMinutes();

    return `${hours}:${minutes}`;
}

const daysArr = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

const monthsArr = ["января", "февраля", "марта", "апреля",
    "мая", "июня", "июля", "августа",
    "сентября", "октября", "ноября", "декабря"]

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