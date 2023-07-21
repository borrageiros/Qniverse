import React from "react";
import { useNavigate } from "react-router-dom";

import "./ButtonLogout.css";

function LogoutButton() {
    let navigate = useNavigate();
    function logout() {
        localStorage.removeItem("session_token");
        localStorage.removeItem("username");
        localStorage.removeItem("elo");
        navigate("/login");
    }
    return (
        <button className="logoutButton" onClick={logout}>LOGOUT</button>
    );
}

export default LogoutButton;

