import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";



import "./EnterCode.css"

const CreateQuestion = () => {

    const { username } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    
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
        console.log("estas clickando")
        navigate("/profile/" + user.username);
    }


    const onClickQuestions = (e) => {
        e.preventDefault();
        window.location.assign("/question-menu");
    }

    const onClickPlay = (e) => {
        e.preventDefault();
        window.location.assign("/play");
    }

    const [formData, setFormData] = useState({
        code: ""
      })
    
      const onchangeCode = (e) => {
        setFormData({ 
            code: e.target.value
        })
      }

        const logged = {
            headers: {
                "Auth-Token": localStorage.getItem("session_token")
            }
        };    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://server.borrageiros.com:8000/v1/questions', formData, logged)
          .then(function (response) {
            navigate("/rival-joined");
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    return (
        <div className="main-container-profile">
            <div className="left-side">

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
                    <input type="button" value="HOME" onClick={onClickHome} />
                    <input type="button" value="QUESTIONS" onClick={onClickQuestions}/>
                    <ButtonLogout/>
                </div>
            </div>

            <div className="rigth-side">
                <div>
                    <form className="code_form" onSubmit={handleSubmit}>
                        <input className="code" type="text" placeholder="ENTER GAME CODE" onChange={onchangeCode}/>
                        <input className="join" type="submit" value="JOIN GAME" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateQuestion;