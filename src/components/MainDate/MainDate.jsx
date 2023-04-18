import React from "react";
import s from './MainDate.module.scss';
import { getDateTxt } from "../../Kernel";

const MainDate = ({dt}) => {
    return <div className={`${s.date} ${s['date-bold']}`} id="mainDate">{getDateTxt(dt)}</div>;
};

export default MainDate;