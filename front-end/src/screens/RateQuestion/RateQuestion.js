import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import UserImage from "../../images/basic_user_image.png";
import Input from "../../components/input/Input";
import ButtonLogout from "../../components/ButtonLogout/ButtonLogout";
import CardRateQuestion from "../../components/CardRateQuestion/CardRateQuestion";

import styles from "./RateQuestion.css"

const RateQuestion = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);

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
    // CHECK IF USER LOGED
    if (localStorage.getItem("session_token") === null) {
      navigate("/login")
    }

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

  useEffect(() => {
      axios.post('http://server.borrageiros.com:8000/v1/questions-to-validate/',{
        "previus_questions": questions
      }, config)
      .then(function (response) {
        setQuestions(response.data)
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
    <div className="main-container-rateQuestion">
      <script src="Carousel.js"></script>

      <div className="left-rateQuestion">
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
          <input type="button" value="PLAY" onClick={onClickPlay} />
          <input type="button" value="CHALLLENGE PLAYER" onClick={onClickChangePlayer} />
          <input type="button" value="QUESTIONS" onClick={onClickQuestions} />
          <ButtonLogout />
        </div>
      </div>


      <div className="rigth-rateQuestion">
        {questions.map((question) => {
          return (
            <CardRateQuestion
              key={question.id}
              id={question.id}
              description={question.description}
              image={question.image}
              answer1={question.answer1}
              answer2={question.answer2}
              answer3={question.answer3}
              answer4={question.answer4}
              correctAnswer={question.correctAnswer} />
          )
        })}
      </div>
    </div>
  );
}

export default RateQuestion;