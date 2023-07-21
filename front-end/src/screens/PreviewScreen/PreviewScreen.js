import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import Input from "../../components/input/Input";
import "./PreviewScreen.css"

import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";

// VERSUS AND USER IMAGE
import Versus from "../../images/versus/versus.png"
import UserImage from "../../images/basic_user_image.png";
// PLANETS
import Mercury from "../../images/planets/Mercury.png";
import Venus from "../../images/planets/Venus.png";
import Earth from "../../images/planets/Earth.png";
import Mars from "../../images/planets/Mars.png";
import Jupiter from "../../images/planets/Jupiter.png";
import Saturn from "../../images/planets/Saturn.png";
import Uranus from "../../images/planets/Uranus.png";
import Neptune from "../../images/planets/Neptune.png";

const PreviewScreen = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // CHECK IF USER LOGED
    useEffect(() => {
        if (localStorage.getItem("session_token") === null) {
            navigate("/login");
        }
    } );

    // USER INFO
    const [user, setUser] = useState({
        username: "",
        elo: "",
        eloPlanet: "",
        editable: false
    })

    // PLAYERS
    const [game, setGame] = useState(
        {
            "player2": {
                "username": "JUANCITO",
                "elo": 40,
                "eloPlanet": "Mercury",
            }
        }
    );

    function getPlanetImg(planet) {
        switch(planet){
            case "Mercury": return Mercury;
            case "Venus": return Venus;
            case "Earth": return Earth;
            case "Mars": return Mars;
            case "Jupiter": return Jupiter;
            case "Saturn": return Saturn;
            case "Uranus": return Uranus;
            case "Neptune": return Neptune;
        }
    };

    // AXIOS REQUEST
    const config = {
        headers:{
            "Auth-Token": localStorage.getItem("session_token")
        }
    };
    useEffect(() => {
        axios.get('http://server.borrageiros.com:8000/v1/users/'+localStorage.getItem("username"), config)
            .then(function (response) {
                setUser(
                    {
                        "username": response["data"]["username"],
                        "elo": response["data"]["elo"],
                        "eloPlanet": response["data"]["eloPlanet"],
                        "editable": response["data"]["editable"]
                    }
                )
            })
    }, []);



    // SEARCH PLAYER INPUT
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const onSubmitSearch = (e) => {
        e.preventDefault()
        navigate("/search-user?username=" + search)
        window.location.reload()
    }

    //LINKS
    const onClickHome = (e) => {
        e.preventDefault();
        window.location.assign("/home");
    }
    
    const onClickChangePlayer = (e) => {
        e.preventDefault();
        window.location.assign("/challenge-player");
    }

    const onClickUserInfo = (e) => {
        e.preventDefault();
        navigate("/profile/" + user.username);
    }

    // SCREEN
    return (
        <div className="main-container">
            <div className="left">

                <div className="user" onClick={onClickUserInfo}>
                    <img src={UserImage} alt="Qniverse logo" />
                    <p>{user.username}</p>
                    <p>{user.elo}★</p>
                </div>

                <div>
                    <form onSubmit={onSubmitSearch}>
                        <Input placeholder="Search a player" onChange={onChangeSearch} className="search-player" type="text" minlength="3" maxlength="20" width="15%"/>
                    </form>
                </div>

                <div className="buttons">
                    <input type="button" value="HOME" onClick={onClickHome}/>
                    <input type="button" value="CHALLENGE PLAYER" onClick={onClickChangePlayer}/>
                    <input type="button" value="QUESTIONS" />
                    <ButtonLogout />
                </div>
            </div>

            <div className="right">
                <h1>{user.eloPlanet} League</h1>
                <div className="preplayer1">
                    <img src={require("../../images/basic_user_image.png")} alt="User image" />
                    <div className="info">
                        <p>{user.username}</p>
                        <p>{user.elo}★</p>
                    </div>
                    <img src={getPlanetImg(user.eloPlanet)} alt="Planet" />
                    <p>{user.eloPlanet}</p>
                </div>

                <img className="versus" src={Versus} alt="versus"></img>

                <div className="preplayer2">
                    <img src={require("../../images/basic_user_image.png")} alt="User image" />
                    <div className="info">
                        <p>{game.player2.username}</p>
                        <p>{game.player2.elo}★</p>
                    </div>
                    <img src={getPlanetImg(game.player2.eloPlanet)} alt="Planet" />
                    <p>{game.player2.eloPlanet}</p>
                </div>
            </div>
        </div>
    );
}

export default PreviewScreen;