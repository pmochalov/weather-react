import React from "react";
import s from './MainDate.module.scss'

const MainDate = () => {
    return <div className={`${s.date} ${s['date-bold']}`} id="mainDate">17 апреля, пн</div>;
};

export default MainDate;