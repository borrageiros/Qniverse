import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import logo from "../../images/qniverse-logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/input/Input";

import styles from "./SignUp.module.css";

const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const onchangeUser = (e) => {
    setFormData({ username: e.target.value, email: formData.email, password: formData.password })
  }

  const onchangeEmail = (e) => {
    setFormData({ username: formData.username, email: e.target.value, password: formData.password })
  }

  const onchangePassword = (e) => {
    setFormData({ username: formData.username, email: formData.email, password: e.target.value })
  }

  const onchangeConfirmPassword = (e) => {
    setFormData({ username: formData.username, email: formData.email, password: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://server.borrageiros.com:8000/v1/users', formData)
      .then(function (response) {
        navigate("/login");
      })
      .catch(function (error) {
        if (error.response.status === 409) {
          alert("Conflict: The username or email is already in use.");
        } else {
          console.log(error);
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
          <Link to={"/login"}>Sign In</Link>
          <Link className={styles.active} to={"/register"}>Sign Up</Link>
        </div>
        <div className={styles.form__data}>
          <Input
            className={styles.form__username}
            id={"register-username"}
            type={"text"}
            width={"100%"}
            name={"register-username"}
            placeholder={"Username"}
            onChange={onchangeUser} />
          <Input
            className={styles.form__email}
            id={"register-email"}
            type={"text"}
            width={"100%"}
            name={"register-email"}
            placeholder={"Email"}
            onChange={onchangeEmail} />
          <Input
            className={styles.form__password}
            id={"register-password"}
            type={"password"}
            width={"100%"}
            name={"register-password"}
            placeholder={"Password"}
            onChange={onchangePassword} />
          <Input
            className={styles.form__confirmPassword}
            id={"register-confirm-password"}
            type={"password"}
            width={"100%"}
            name={"register-confirm-password"}
            placeholder={"Confirm password"}
            onChange={onchangeConfirmPassword} />
        </div>
        <Button
          className={styles.form__btnCreateAccount}
          text={"Create account"}
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

export default SignUp;