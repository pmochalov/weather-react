import React from "react";
import Card from "./Card";
import s from "./Cards.module.scss";
import { TabsContext } from "../../App";
import { getDateTxt } from "../../lib/Kernel";

const Cards = () => {
    const { mode, shortData, detailedData } = React.useContext(TabsContext);

    if (mode === "short") {
        return (
            <div className={s.cards}>
                {shortData.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>
        );
    }

    if (mode === "detailed") {
        const daysItems = detailedData.map((item, index) => {
            const cards = item[1].map((data, index) => {
                return <Card key={index} data={data} />;
            });

            return (
                <div key={index}>
                    <div className={`${s.cards} ${s.cards__date}`}>
                        {getDateTxt(item[0], true)}
                    </div>
                    <div className={s.cards}>{cards}</div>
                </div>
            );
        });

        return daysItems;
    }
};

export default Cards;
