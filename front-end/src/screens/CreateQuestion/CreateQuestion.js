import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";



import "./CreateQuestion.css"

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


    const onClickChallenge = (e) => {
        e.preventDefault();
        window.location.assign("/challenge-player");
    }

    const onClickPlay = (e) => {
        e.preventDefault();
        window.location.assign("/play");
    }

    const [formData, setFormData] = useState({
        description: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        image: "",
        correctAnswer: ""
      })
    
      const onchangeQuestion = (e) => {
        setFormData({ 
            description: e.target.value,
            answer1: formData.answer1,
            answer2: formData.answer2,
            answer3: formData.answer3,
            answer4: formData.answer4,
            image: formData.image,
            correctAnswer: formData.correctAnswer
         })
      }

      const onchangeAns1 = (e) => {
        setFormData({ 
            description: formData.description,
            answer1: e.target.value,
            answer2: formData.answer2,
            answer3: formData.answer3,
            answer4: formData.answer4,
            image: formData.image,
            correctAnswer: formData.correctAnswer
        })
      }

      const onchangeAns2 = (e) => {
        setFormData({ 
            description: formData.description,
            answer1: formData.answer1,
            answer2: e.target.value,
            answer3: formData.answer3,
            answer4: formData.answer4,
            image: formData.image,
            correctAnswer: formData.correctAnswer 
        })
      }

      const onchangeAns3 = (e) => {
        setFormData({ 
            description: formData.description,
            answer1: formData.answer1,
            answer2: formData.answer2,
            answer3: e.target.value,
            answer4: formData.answer4,
            image: formData.image,
            correctAnswer: formData.correctAnswer 
        })
      }

      const onchangeAns4 = (e) => {
        setFormData({ 
            description: formData.description,
            answer1: formData.answer1,
            answer2: formData.answer2,
            answer3: formData.answer3,
            answer4: e.target.value,
            image: formData.image,
            correctAnswer: formData.correctAnswer 
        })
      }

      const onchangeImage = (e) => {
        setFormData({ 
            description: formData.description,
            answer1: formData.answer1,
            answer2: formData.answer2,
            answer3: formData.answer3,
            answer4: formData.answer4,
            image: e.target.value,
            correctAnswer: formData.correctAnswer 
        })
      }

      const onOptionChange = (e) => {
        setFormData({ 
            description: formData.description,
            answer1: formData.answer1,
            answer2: formData.answer2,
            answer3: formData.answer3,
            answer4: formData.answer4,
            image: formData.image,
            correctAnswer: e.target.value 
        });
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
            alert("Question created succesfully");
            navigate("/question-menu");
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
                    <input type="button" value="CHALLLENGE PLAYER" onClick={onClickChallenge}/>
                    <input type="button" value="HOME" onClick={onClickHome} />
                    <ButtonLogout/>
                </div>
            </div>

            <div className="rigth-side">
                <div>
                    <form className="question_form" onSubmit={handleSubmit}>
                        <textarea className="question" name="question" rows="3" cols="30" placeholder="QUESTION" onChange={onchangeQuestion}></textarea>
                        <input className="image_url" type="text" placeholder="IMAGE URL (OPTIONAL)" onChange={onchangeImage}/>
                        <input className="answer" type="text" placeholder="ANSWER 1" onChange={onchangeAns1}/>
                        <input className="answer" type="text" placeholder="ANSWER 2" onChange={onchangeAns2}/>
                        <input className="answer" type="text" placeholder="ANSWER 3" onChange={onchangeAns3}/>
                        <input className="answer" type="text" placeholder="ANSWER 4" onChange={onchangeAns4}/>
                        
                        <div class="container">
                            <p><b>Choose the correct answer:</b></p>
                            <select onChange={onOptionChange}>
                                    <option value="1">Answer 1</option>
                                    <option value="2">Answer 2</option>
                                    <option value="3">Answer 3</option>
                                    <option value="4">Answer 4</option>
                            </select>
                        </div>
                        <input className="create" type="submit" value="CREATE" />
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default CreateQuestion;