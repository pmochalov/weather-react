import React from "react";
import Card from "./Card";

import s from "./Cards.module.scss";

const Cards = ({ mode, shortData, detailedData }) => {

    console.log(detailedData)
    
    if(mode === 'short') {
        return (
            <div className={s.cards}>
                {shortData.map((data, index) => <Card key={index} data={data} />)}
            </div>
        );
    }

    if(mode === 'detailed') {
        return (
            <div className={s.cards}>
                {detailedData.map((data, index) => <Card key={index} data={data} />)}
            </div>
        );
    }    

};

export default Cards;
