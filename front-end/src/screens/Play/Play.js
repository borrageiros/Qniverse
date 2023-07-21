import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";

import "./Play.css"




const Play = () => {
    useEffect(() => {
        var socket;
        
        // document.addEventListener("DOMContentLoaded", () => {
            socket = new WebSocket('ws://server.borrageiros.com:8000/ws/search_or_create_game/');
            
            // Fired when a connection with a WebSocket is opened
            socket.onopen = function () {
                socket.send(JSON.stringify({"status": "Search for a lobby", "Auth-Token": localStorage.getItem("session_token")}))
            };
            
            // Fired when data is received through a WebSocket
            socket.onmessage = function(event) {
                const response = JSON.parse(event.data)        
                if (response.reply == "Lobby getted"){
                    window.location.assign("/rival-joined/"+response.rival+"/"+response.game_start)
                }
            };
            
            socket.onclose = function(event) {
                // TO-DO 
            };
            
            socket.onerror = function(event) {
                // TO-DO
            };
        // })

    }, []);
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

    // TODO: When clicking play button we need to search players (no api endpoint at the moment)
    // We make an example with hardcoded data.
    const [players, setPlayers] = useState({
        "player1": {
            "username": "Pablo",
            "elo": "2500",
            "eloPlanet": "Mercury",
        },
        "player2": {
            "username": "Angel",
            "elo": "2570",
            "eloPlanet": "Mercury",
        }
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

    const onClickQuestions = (e) => {
        e.preventDefault();
        window.location.assign("/question-menu");
    }

    return (
        <div className="main-container">
            <div className="left">

                <div className="user">
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
                    <input type="button" value="CHALLLENGE PLAYER" onClick={onClickChangePlayer}/>
                    <input type="button" value="QUESTIONS" onClick={onClickQuestions}/>
                    <ButtonLogout />
                </div>
            </div>

            <div className="rigth-play">
                <LoadingSpinner size="8"/>
            </div>
        </div>
    );
}

export default Play;