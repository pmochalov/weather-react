import React from "react";
import s from "./Tabs.module.scss";
import Cards from "./Cards";
import { TabsContext } from "../../App";

const Tabs = () => {
    
    const { mode, handleSetMode, shortData, detailedData } = React.useContext(TabsContext);

    return (
        <div className={s.tabs}>
            <TabsMenu mode={mode} handleSetMode={handleSetMode} />

            <div id='tabsContent' className={s.tabs__content}>
                <div className={s.tabs__block}>
                    <Cards mode={mode} shortData={shortData} detailedData={detailedData}/>
                </div>
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
