import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Pencil from "../../images/pencil.svg"
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

import "./Profile.css"

const Profile = () => {

    const { username } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const planets = {
        "Mercury": Mercury,
        "Venus": Venus,
        "Earth": Earth,
        "Mars": Mars,
        "Jupiter": Jupiter,
        "Saturn": Saturn,
        "Uranus": Uranus,
        "Neptune": Neptune,
    };
    const [userCanEditName, setUserCanEditName] = useState(false)

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

    const [userSearched, setUserSearched] = useState({
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
        axios.get('http://server.borrageiros.com:8000/v1/users/' + username, config)
            .then(function (response) {
                setUserSearched(
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
        navigate("/home");
    }

    function onClickUserInfo(e) {
        e.preventDefault();
        navigate("/profile/" + user.username);
        window.location.reload()
    }

    const onSubmitSendNewName = (e) => {
        e.preventDefault();

        let newName = document.getElementById("newName");

        axios.post('http://server.borrageiros.com:8000/v1/update-user',
            {
                "username": newName.value
            },
            config)
            .then(function (response) {
                user.username = newName.value;
                setUser(user)
                localStorage.setItem("username", user.username)
                navigate("/home");
            })
            .catch((error) => {
                if( error.response.status === 409 ){
                    alert("Username already in use!")
                }
            });
    }

    const renameName = (e) => {
        e.preventDefault();
        setUserCanEditName(!userCanEditName)
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
        <div className="main-container-profile">
            <div className="left-home-profile">

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
                    <input type="button" value="HOME" onClick={onClickHome} />
                    <input type="button" value="CHALLLENGE PLAYER" onClick={onClickChangePlayer}/>
                    <input type="button" value="QUESTIONS" onClick={onClickQuestions}/>
                    <ButtonLogout/>
                </div>
            </div>

            <div className="rigth-home-profile">
                <div>
                    <div className="image-container-profile">
                        <img src={UserImage} alt="user image" />
                    </div>
                    <form className="user-name-profile" onSubmit={onSubmitSendNewName}>
                        {user.username != userSearched.username &&
                            <p>{userSearched.username}</p>
                        }

                        {(user.username === userSearched.username && !userCanEditName) &&
                            <div className="edit-name-profile">
                                <p>{userSearched.username}</p>
                                <img src={Pencil} alt="pencil icon" onClick={renameName} />
                            </div>
                        }

                        {(user.username === userSearched.username && userCanEditName) &&
                            <div className="edit-name-profile">
                                <input className="input-name-profile" id="newName" type="text" placeholder={userSearched.username} minLength={3} />
                                <input className="btn-cancel-profile" type="submit" value="X" onClick={renameName} />
                                <input className="btn-accept-profile" type="submit" value="✔" />
                            </div>
                        }

                    </form>
                    <p className="user-stars-profile">{userSearched.elo} stars</p>
                    <div className="user-planet-profile">
                        <img src={planets[userSearched.eloPlanet]} alt="planet name" />
                        <p>{userSearched.eloPlanet}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;