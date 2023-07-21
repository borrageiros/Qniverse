import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import logo from "../../images/qniverse-logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/input/Input";

import styles from "./PasswordRecovery.module.css"

const PasswordRecovery = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ""
  })

  const onchangeEmail = (e) => {
    setFormData({ email: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    axios.put('http://server.borrageiros.com:8000/v1/password-recovery', formData)
      .then(function (response) {
        alert("Email sent, redirecting to login page");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Link to={"/login"}>
          <img className={styles.form__logo} src={logo} alt="Qniverse logo" />
        </Link>
        <h3>Recover your account</h3>
        <p>Enter your email to find your account</p>
        <Input
            className={styles.form__email}
            id={"forgot-email"}
            type={"email"}
            width={"100%"}
            name={"forgot-email"}
            placeholder={"Email"}
            onChange={onchangeEmail} />
        <Button 
          className={styles.form__btnSend}
          text={"Send"}
          width={"80%"}
          borderRadius={"12px"}
          bgColor={"#CA00CE"} />
        <Link className={styles.copyright} to={"/copyright"}>
          © Copyright - Qniverse 2023 - Terms
        </Link>
      </form>
    </div>
  );
}

export default PasswordRecovery;