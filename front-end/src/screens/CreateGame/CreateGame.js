import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";

import "./CreateGame.css"

// SPINNER
import Loading from "../../images/loading/loading.gif";

// PLANETS
import Mercury from "../../images/planets/Mercury.png";
import Venus from "../../images/planets/Venus.png";
import Earth from "../../images/planets/Earth.png";
import Mars from "../../images/planets/Mars.png";
import Jupiter from "../../images/planets/Jupiter.png";
import Saturn from "../../images/planets/Saturn.png";
import Uranus from "../../images/planets/Uranus.png";
import Neptune from "../../images/planets/Neptune.png";

const CreateGame = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // STATE CHANGE IN SOCKETS (THIS IS A TEST)
    const [opponentFound, setOpponentFound] = useState(false)

    // PLAYERS
    const [game, setGame] = useState(
        {
            "player2": {
                "username": "Antonio",
                "elo": 0,
                "eloPlanet": "Mercury",
            }
        }
    );

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


    // SEARCH PLAYER INPUT
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const onSubmitSearch = (e) => {
        e.preventDefault()
        navigate("/search-user?username=" + search)
        window.location.reload()
    }

    const onClickHome = (e) => {
        e.preventDefault();
        window.location.assign("/home");
    }

    const onClickChangePlayer = (e) => {
        e.preventDefault();
        window.location.assign("/challenge-player");
    }
    

    const onClickCreateGame = (e) => {
        e.preventDefault();
        window.location.assign("/create-game");
    }

    const onClickJoinGame = (e) => {
        e.preventDefault();
        window.location.assign("/join-game");
    }

    const onClickQuestions = (e) => {
        e.preventDefault();
        window.location.assign("/question-menu");
    }

    const onClickPlay = (e) => {
        e.preventDefault();
        window.location.assign("/play");
    }

    const onClickUserInfo = (e) => {
        e.preventDefault();
        navigate("/profile/" + user.username);
    }

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
                    <input type="button" value="PLAY" onClick={onClickPlay}/>
                    <input type="button" value="HOME" onClick={onClickHome}/>
                    <input type="button" value="QUESTIONS"  onClick={onClickQuestions}/>
                    <ButtonLogout />
                </div>
            </div>

            <div className="rigth-create-game">

                {/* OPPONENT FOUNT VARIABLE WILL CHANGE WITH THE SOCKETS */}
                {opponentFound &&
                    <div className="buttons-create-game">

                        <h3>The code is: KJGYADFK</h3>

                        <div className="rival">
                            <img src={require("../../images/basic_user_image.png")} alt="User image" />
                            <div className="info">
                                <p>{game.player2.username}</p>
                                <p>{game.player2.elo}★</p>
                            </div>
                            <img src={getPlanetImg(game.player2.eloPlanet)} alt="Planet" />
                            <p>{game.player2.eloPlanet}</p>
                        </div>

                        <input className="buttonQuestionsMenu" type="button" value="START GAME" onClick={onClickJoinGame}/>
                    
                    </div>
                }

                {!opponentFound &&
                    <div className="buttons-create-game">

                        <h3>The code is: KJGYADFK</h3>

                        <img className="create-game-loading" src={Loading}></img>

                        <h3>Waiting for oponent</h3>
                    
                    </div>
                }


            </div>
        </div>
    );
}

export default CreateGame;