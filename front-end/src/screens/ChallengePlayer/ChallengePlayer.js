import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";

import "./ChallengePlayer.css"

const ChallengePlayer = () => {

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

            <div className="rigth-challenge-player">
                <div className="buttons-challenge-player">
                    <input className="buttonQuestionsMenu" type="button" value="CREATE GAME" onClick={onClickCreateGame}/>
                    <input className="buttonQuestionsMenu" type="button" value="JOIN GAME" onClick={onClickJoinGame}/>
                </div>
            </div>
        </div>
    );
}

export default ChallengePlayer;