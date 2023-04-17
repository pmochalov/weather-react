import React from "react";
import s from "./Tabs.module.scss";

const Tabs = ({ mode, handleSetMode }) => {
    return (
        <div className={s.tabs}>
            <TabsMenu mode={mode} handleSetMode={handleSetMode} />

            <div id='tabsContent' className={s.tabs__content}>
                <div className={s.tabs__block}>Какой-то контент</div>
            </div>
        </div>
    );
};

const TabsMenu = ({ mode, handleSetMode }) => {
    return (
        <ul className={s.tabs__menu}>
            <li
                onClick={handleSetMode}
                data-mode='short'
                className={mode === "short" ? s.active : ""}
            >
                Краткий прогноз
            </li>
            <li
                onClick={handleSetMode}
                data-mode='detailed'
                className={mode === "detailed" ? s.active : ""}
            >
                Подробный
            </li>
        </ul>
    );
};

export default Tabs;