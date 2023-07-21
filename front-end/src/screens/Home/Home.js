import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";

// PLANETS
import Mercury from "../../images/planets/Mercury.png";
import Venus from "../../images/planets/Venus.png";
import Earth from "../../images/planets/Earth.png";
import Mars from "../../images/planets/Mars.png";
import Jupiter from "../../images/planets/Jupiter.png";
import Saturn from "../../images/planets/Saturn.png";
import Uranus from "../../images/planets/Uranus.png";
import Neptune from "../../images/planets/Neptune.png";

import "./Home.css"

const Home = () => {

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
        headers: {
            "Auth-Token": localStorage.getItem("session_token")
        }
    };
    useEffect(() => {
        axios.get('http://server.borrageiros.com:8000/v1/users/' + localStorage.getItem("username"), config)
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

    const onClickPlay = (e) => {
        e.preventDefault();
        navigate("/play");
    }

    const onClickUserInfo = (e) => {
        e.preventDefault();
        navigate("/profile/" + user.username);
    }

    const onClickChangePlayer = (e) => {
        e.preventDefault();
        window.location.assign("/challenge-player");
    }

    const onClickQuestions = (e) => {
        e.preventDefault();
        window.location.assign("/question-menu");
    }

    // SCREEN
    return (
        <div className="main-container-home">
            <script src="Carousel.js"></script>

            <div className="left-home">
                <div className="user" onClick={onClickUserInfo}>
                    <img src={UserImage} alt="Qniverse logo" />
                    <p>{user.username}</p>
                    <p>{user.elo}★</p>
                </div>

                <div>
                    <form onSubmit={onSubmitSearch}>
                        <Input placeholder="Search a player" onChange={onChangeSearch} className="search-player" type="text" minlength="3" maxlength="20" width="15%" />
                    </form>
                </div>

                <div className="buttons">
                    <input type="button" value="PLAY" onClick={onClickPlay}/>
                    <input type="button" value="CHALLLENGE PLAYER" onClick={onClickChangePlayer}/>
                    <input type="button" value="QUESTIONS" onClick={onClickQuestions}/>
                    <ButtonLogout/>
                </div>
            </div>


            <div className="rigth-home">

                <div className="planets">

                    <div className={"Mercury" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Mercury} alt="Elo" />
                        <p>0★</p>
                    </div>

                    <div className={"Venus" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Venus} alt="Elo" />
                        <p>1000★</p>
                    </div>

                    <div className={"Earth" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Earth} alt="Elo" />
                        <p>2000★</p>
                    </div>

                    <div className={"Mars" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Mars} alt="Elo" />
                        <p>3000★</p>
                    </div>

                    <div className={"Jupiter" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Jupiter} alt="Elo" />
                        <p>4000★</p>
                    </div>

                    <div className={"Saturn" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Saturn} alt="Elo" />
                        <p>5000★</p>
                    </div>

                    <div className={"Uranus" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Uranus} alt="Elo" />
                        <p>6000★</p>
                    </div>

                    <div className={"Neptune" === user.eloPlanet ? "active" : ""}>
                        <span></span>
                        <img src={Neptune} alt="Elo" />
                        <p>7000★</p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Home;