import React from "react";
import s from "./Intro.module.scss";
import "./../../common/scss/_fonts.scss";

const Intro = () => {
    return (
        <>
            <div className={s.intro}>
                <div id='mainTemp'>+9°C</div>
                <div>
                    <div className={s.weatherImg} id='mainWeatherImg'>
                        <figure className="icon-01d"></figure>
                    </div>
                    <div className={s.weatherDesc} id='mainWeatherDesc'>ясно</div>
                </div>
                <div>
                    <div className={s.weatherData}>
                        <div
                            className={s.weatherData__pressure}
                            id='mainWeatherPressure'
                        >770 мм.рт.ст</div>
                        <div
                              className={s.weatherData__wind}
                            id='mainWeatherWind'
                        >ЗСЗ, 2 м/с</div>
                        <div
                            className={s.weatherData__hydro}
                            id='mainWeatherHydro'
                        >27 %</div>
                        <div className={s.weatherData__sun}>
                            <span id='mainWeatherSunrise'>Восход: 4:38</span>
                            <span id='mainWeatherSunset'>Закат: 19:55</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Intro;
