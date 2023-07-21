import "./Game.css"
import UserImage from "../../images/basic_user_image.png";
import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Game = () => {
    const navigate = useNavigate();
    const [game, setGame] = useState();
    const [questions, setQuestions] = useState([]);
    const [gamePoints, setGamePoints] = useState(0);

    
    
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

    // GET USERNAME
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
        
        
        // EXAMPLE OF GETTING QUESTIONS BY THE SOCKET
        useEffect(() => {
            axios.get('http://server.borrageiros.com:8000/v1/recive-questions?total=10', config)
            .then(function (response) {
                setQuestions(response.data.questions)
            })
        }, []);
        


        // TIMER
        const timerSecs = 10;
        const [count, setCount] = useState(timerSecs);
        const [questionToShow, setQuestionToShow] = useState(0);
        useEffect(() => {
            const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
            if (timer == 0){
                setQuestionToShow(questionToShow + 1)
                setCount(timerSecs);
                setAnswer1("")
                setAnswer2("")
                setAnswer3("")
                setAnswer4("")
                setAnswered(false)
            }
            if (timer == 0 && questionToShow == 9){
                navigate("/results")
            }
            return () => clearInterval(timer);
        }, [count]);



        // ON CLICK ANSWERS (ALL OF FUCTIONS CHECK IF THE QUESTION IS ANSWERED -> IF THE ANSWERD ITS CORRECT)
        const [answered, setAnswered] = useState(false);

        const [answer1, setAnswer1] = useState();
        const onClickAnswer1 = (e) => {
            e.preventDefault()
            if (!answered){
                if (questions[questionToShow].correctAnswer == 1){
                    setAnswer1("correct")
                    setGamePoints(gamePoints +1)
                }else{
                    setAnswer1("incorrect")
                }
            }
            setAnswered(true)
        }
        const [answer2, setAnswer2] = useState();
        const onClickAnswer2 = (e) => {
            e.preventDefault()
            if (!answered){
                if (questions[questionToShow].correctAnswer == 2){
                    setAnswer2("correct")
                    setGamePoints(gamePoints +1)
                }else{
                    setAnswer2("incorrect")
                }
            }
            setAnswered(true)
        }
        const [answer3, setAnswer3] = useState();
        const onClickAnswer3 = (e) => {
            e.preventDefault()
            if (!answered){
                if (questions[questionToShow].correctAnswer == 3){
                    setAnswer3("correct")
                    setGamePoints(gamePoints +1)
                }else{
                    setAnswer3("incorrect")
                }
            }
            setAnswered(true)
        }
        const [answer4, setAnswer4] = useState();
        const onClickAnswer4 = (e) => {
            e.preventDefault()
            if (!answered){
                if (questions[questionToShow].correctAnswer == 4){
                    setAnswer4("correct")
                    setGamePoints(gamePoints +1)
                }else{
                    setAnswer4("incorrect")
                }
            }
            setAnswered(true)
        }

        return (
            <div className="game-main-container">

            <div className="game-profile">
                <img src={UserImage} alt="User image" />
                <p>{user.username}</p>
                <p>{user.elo}★</p>
            </div>

            {/* EXAMPLE OF QUESTION WITHOUT SOCKET */}
            <div className="game-question">
                <h3 className="timer">{count}</h3>
                {/* show image if exists */}
                {questions.length > 0 && questions[questionToShow].image !== "" && 
                    <img src={questions[questionToShow].image}></img>
                }
                {/* show question and answers */}
                {questions.length > 0 &&
                    <>
                        <h1 className="description">{questions[questionToShow].description}</h1>
                        <div className="answers">
                            <button className={answer1} onClick={onClickAnswer1}> {questions[questionToShow].answer1} </button>
                            <button className={answer2} onClick={onClickAnswer2}> {questions[questionToShow].answer2} </button>
                            <button className={answer3} onClick={onClickAnswer3}> {questions[questionToShow].answer3} </button>
                            <button className={answer4} onClick={onClickAnswer4}> {questions[questionToShow].answer4} </button>
                        </div>
                    </>
                }
            </div>

      </div>
    );
}

export default Game;