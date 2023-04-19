import React from "react";
import s from "./MainDate.module.scss";
import { getDateTxt } from "../../lib/Kernel";

import { WeatherContext } from "../../App";

const MainDate = () => {
    const { dt } = React.useContext(WeatherContext);

    return (
        <div className={`${s.date} ${s["date-bold"]}`}>
            {getDateTxt(dt)}
        </div>
    );
};

export default MainDate;
