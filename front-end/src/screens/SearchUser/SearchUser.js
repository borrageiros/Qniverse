import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import SearchedUser from "../../components/SearchedUser/SearchedUser";

import "./SearchUser.css"

const SearchUser = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const url = new URL(window.location.href);
    const username = url.searchParams.get("username");

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

    const [usersSearched, setUsersSearched] = useState([])

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
        axios.get('http://server.borrageiros.com:8000/v1/users?username=' + username, config)
            .then(function (response) {
                setUsersSearched(response["data"]["users"])
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
    }

    const onClickChangePlayer = (e) => {
        e.preventDefault();
        window.location.assign("/challenge-player");
    }

    const onClickQuestions = (e) => {
        e.preventDefault();
        window.location.assign("/question-menu");
    }

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

    return (
        <div className="main-container-profile">
            <div className="left-home-profile">
                <div className="user" onClick={onClickUserInfo}>
                    <img src={UserImage} alt="Qniverse logo" />
                    <p>{user.username}</p>
                    <p>{user.elo}★</p>
                </div>

                <form onSubmit={onSubmitSearch}>
                    <Input placeholder="Search a player" onChange={onChangeSearch} className="search-player" type="text" minlength="3" maxlength="20" width="15%" />
                </form>

                <div className="buttons">
                    <input type="button" value="HOME" onClick={onClickHome} />
                    <input type="button" value="CHALLLENGE PLAYER" onClick={onClickChangePlayer}/>
                    <input type="button" value="QUESTIONS" onClick={onClickQuestions}/>
                    <LogoutButton/>
                </div>
            </div>

            <div className="rigth-home-searchUser">
                {usersSearched.map((name) => { return <SearchedUser text={name} img={UserImage}/> })}
            </div>
        </div>
    );
}

export default SearchUser;