// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Icon from "../logo.png"; // Adjust path to your local icon

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("email");
        navigate("/signin");
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left"></div>
                <div className="header-center">
                    <img src={Icon} alt="Icon" className="header-icon" />
                </div>
                <div className="header-right">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
