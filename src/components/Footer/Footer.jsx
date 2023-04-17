import React from "react";
import s from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={s.footer}>
            <span>
                Сделал <a href='https://mchlv.ru/'>Павел Мочалов</a>
            </span>
        </footer>
    );
};

export default Footer;
