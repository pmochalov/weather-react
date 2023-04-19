import React from "react";
import s from "./Card.module.scss";
import { getWind, getDateTxt, getTimeTxt, getTempTxt, getPressure } from "../../lib/Kernel";
import { TabsContext } from "../../App";

const Card = ({ data }) => {
    const { mode } = React.useContext(TabsContext);

    if(mode === 'short') {
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
                <div className={s.card__item}>
                    {getPressure(data.pressure)} мм.рт.ст
                </div>
                <div className={s.card__item}>
                    {getWind(data.deg)}, {data.speed} м/с
                </div>
            </div>
        );
    }

    if(mode === 'detailed') {
        return (
            <div className={s.card}>
                <div className={s.card__date}>{getTimeTxt(data.dt)}</div>
                <div className={s.card__icon}>
                    <figure className={`icon-${data.weather[0].icon}`}></figure>
                </div>
                <div className={s.card__temp}>{getTempTxt(data?.main?.temp)}</div>
                <div className={s.card__item}>{getTempTxt(data?.main?.temp_min)}</div>
                <div className={s.card__item}>{data.weather[0].description}</div>
                <div className={s.card__item}>{data?.main?.humidity} %</div>
                <div className={s.card__item}>
                    {getPressure(data?.main?.pressure)} мм.рт.ст
                </div>
                <div className={s.card__item}>
                    {getWind(data?.wind?.deg)}, {data?.wind?.speed} м/с
                </div>
            </div>
        );
    }
};

export default Card;
