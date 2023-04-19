import React from "react";
import s from "./Intro.module.scss";
import "./../../common/scss/_fonts.scss";
import { getWind, getTimeTxt, getTempTxt, getPressure } from "../../lib/Kernel";
import { WeatherContext } from "../../App";

const Intro = () => {

    const {main, weather, wind, sys} = React.useContext(WeatherContext);

    return (
        <>
            <div className={s.intro}>
                <div id='mainTemp'>{getTempTxt(main?.temp)}°C</div>
                <div>
                    <div className={s.weatherImg} id='mainWeatherImg'>
                        <figure className={`icon-${weather?.icon}`}></figure>
                    </div>
                    <div className={s.weatherDesc} id='mainWeatherDesc'>{weather?.description}</div>
                </div>
                <div>
                    <div className={s.weatherData}>
                        <div
                            className={s.weatherData__pressure}
                            id='mainWeatherPressure'
                        >{getPressure(main?.pressure)} мм.рт.ст</div>
                        <div
                              className={s.weatherData__wind}
                            id='mainWeatherWind'
                        >{getWind(wind?.deg)}, {wind?.speed} м/с</div>
                        <div
                            className={s.weatherData__hydro}
                            id='mainWeatherHydro'
                        >{main?.humidity} %</div>
                        <div className={s.weatherData__sun}>
                            <span id='mainWeatherSunrise'>Восход: {getTimeTxt(sys?.sunrise)}</span>
                            <span id='mainWeatherSunset'>Закат: {getTimeTxt(sys?.sunset)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Intro;
