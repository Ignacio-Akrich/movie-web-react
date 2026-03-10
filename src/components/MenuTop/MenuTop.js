import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

import './MenuTop.scss';

export default function MenuTop() {
    const location = useLocation();

    const getSelectedKey = () => {
        switch (location.pathname) {
            case '/new-movies': return ['2'];
            case '/popular-movies': return ['3'];
            case '/search': return ['4'];
            default: return ['1'];
        }
    };

    return (
        <div className="menu">
            <Link to="/" className="menu-top">
            <div className="menu-top__logo">
                <Logo />
            </div>
                </Link>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={getSelectedKey()}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/new-movies">Ultimos Estrenos</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/popular-movies">Peliculas Populares</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/search">Buscar</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}