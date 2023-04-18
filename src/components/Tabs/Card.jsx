import React from "react";
import s from "./Card.module.scss";
import { getWind, getDateTxt, getTempTxt, getPressure } from "../../lib/Kernel";

const Card = ({ data }) => {

    return (
        <div className={s.card}>
            <div className={s.card__date}>{getDateTxt(data.dt, true)}</div>
            <div className={s.card__icon}>
                <figure className={`icon-${data.weather[0].icon}`}></figure>
            </div>
            <div className={s.card__temp}>{getTempTxt(data.temp?.day)}</div>
            <div className={s.card__item}>{getTempTxt(data.temp?.night)}</div>
            <div className={s.card__item}>{data.weather[0].description}</div>
            <div className={s.card__item}>{data.humidity} %</div>
            <div className={s.card__item}>{getPressure(data.pressure)} мм.рт.ст</div>
            <div className={s.card__item}>{getWind(data.deg)}, {data.speed} м/с</div>
        </div>
    );
};

export default Card;



