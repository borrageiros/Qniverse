import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../images/qniverse-logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/input/Input";

import styles from "./SignIn.module.css"

const SignIn = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  useEffect(() => {
    if (localStorage.getItem("session_token") !== null) {
        navigate("/home");
    }
  } );

  const onchangeUser = (e) => {
    setFormData({
      username: e.target.value,
      password: formData.password
    })
  }

  const onchangePassword = (e) => {
    setFormData({
      username: formData.username,
      password: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://server.borrageiros.com:8000/v1/sessions', formData)
      .then(function (response) {
        localStorage.setItem("session_token", response["data"]["session_token"]);
        localStorage.setItem("username", response["data"]["username"]);
        localStorage.setItem("elo", response["data"]["elo"]);
        navigate("/home");
      })
      .catch(function (error) {
        if (error.response.status === 401 || error.response.status === 404) {
          alert("Incorrect username or password ");
          setFormData({
            username: "",
            password: ""
          });
          document.getElementById("login-username").value = "";
          document.getElementById("login-password").value = "";
        }
      });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Link to={"/login"}>
          <img className={styles.form__logo} src={logo} alt="Qniverse logo" />
        </Link>
        <div className={styles.form__links}>
          <Link className={styles.active} to={"/login"}>Sign In</Link>
          <Link to={"/register"}>Sign Up</Link>
        </div>
        <div className={styles.form__data}>
          <Input
            className={styles.form__username}
            id={"login-username"}
            type={"text"}
            width={"100%"}
            name={"login-username"}
            placeholder={"Username"}
            onChange={onchangeUser} />
          <Input
            className={styles.form__password}
            id={"login-password"}
            type={"password"}
            width={"100%"}
            name={"login-password"}
            placeholder={"Password"}
            onChange={onchangePassword} />
        </div>
        <Button 
          className={styles.form__btnLogin}
          text={"Log In"}
          width={"80%"}
          borderRadius={"12px"}
          bgColor={"#CA00CE"} />
        <Link 
          className={styles.forgotPassword}
          to={"/password-recovery"}>
          Forgot password?
        </Link>
        <Link className={styles.copyright} to={"/copyright"}>
          © Copyright - Qniverse 2023 - Terms
        </Link>
      </form>
    </div>
  );
}

export default SignIn;