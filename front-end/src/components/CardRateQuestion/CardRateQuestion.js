import { useState } from 'react';
import axios from "axios";

import styles from './CardRateQuestion.module.css';

export default function CardRateQuestion(props) {

  const imageAvailable = props.image ? <img src={props.image} /> : null
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const config = {
    headers: {
      "Auth-Token": localStorage.getItem("session_token")
    }
  };

  const onClickAccept = () => {
    setQuestionAnswered(true)
    setUserAnswer("Accept");

    axios.post('http://server.borrageiros.com:8000/v1/question-vote/' + props.id, {
      "rating": "True"
    }, config)
      .then(function (response) {
        console.log(response)
      })
  }

  const onClickDecline = () => {
    setQuestionAnswered(true)
    setUserAnswer("Decline")

    axios.post('http://server.borrageiros.com:8000/v1/question-vote/' + props.id, {
      "rating": "False"
    }, config)
      .then(function (response) {
      })
  }

  if (imageAvailable !== null) {
    return (
      <div className={styles.card}>
        {imageAvailable}
        <div className={styles.card__info}>
          <p className={styles.card__description}>{props.description}</p>
          <div>
            <p className={props.correctAnswer === 1 ? styles.correct : ""}>a) {props.answer1}</p>
            <p className={props.correctAnswer === 2 ? styles.correct : ""}>b) {props.answer2}</p>
            <p className={props.correctAnswer === 3 ? styles.correct : ""}>c) {props.answer3}</p>
            <p className={props.correctAnswer === 4 ? styles.correct : ""}>d) {props.answer4}</p>
          </div>
          <div className={styles.card__options}>
            {
              !questionAnswered &&
              <>
                <button className={styles.card2__btnAccept} type="button" onClick={onClickAccept}>Yes</button>
                <button className={styles.card2__btnDecline} type="button" onClick={onClickDecline}>No</button>
              </>
            }
            {
              questionAnswered &&
              <p className={styles.card__questionAnswered}>Question answered: <b>{userAnswer}</b></p>
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card2}>
      {imageAvailable}
      <p className={styles.card2__description}>{props.description}</p>
      <div>
        <p className={props.correctAnswer === 1 ? styles.correct : ""}>a) {props.answer1}</p>
        <p className={props.correctAnswer === 2 ? styles.correct : ""}>b) {props.answer2}</p>
        <p className={props.correctAnswer === 3 ? styles.correct : ""}>c) {props.answer3}</p>
        <p className={props.correctAnswer === 4 ? styles.correct : ""}>d) {props.answer4}</p>
      </div>
      <div className={styles.card2__options}>
        {
          !questionAnswered &&
          <>
            <button className={styles.card2__btnAccept} type="button" onClick={onClickAccept}>Yes</button>
            <button className={styles.card2__btnDecline} type="button" onClick={onClickDecline}>No</button>
          </>
        }
        {
          questionAnswered &&
          <p className={styles.card2__questionAnswered}>Question answered: <b>{userAnswer}</b></p>
        }
      </div>
    </div>
  )
}