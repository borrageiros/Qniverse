import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

import logo from "../../images/qniverse-logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/input/Input";

import styles from "./ChangePassword.module.css";


const ChangePassword = () => {
  let { code } = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: code,
    "new-pass": "",
  });

  const onchangeNewPassword = (e) => {
    setFormData({ code: formData.code, "new-pass": e.target.value });
  };

  const onchangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData["new-pass"] !== confirmPassword) {
      setError(true);
      return;
    }

    axios.put(`http://server.borrageiros.com:8000/v1/restore-password`, formData)
      .then(function (response) {
        alert("Password changed successfully");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Link to={"/login"}>
          <img className={styles.form__logo} src={logo} alt="Qniverse logo" />
        </Link>
        {error && <div className={styles.form__errorMessage}>¡Passwords do not match!</div>}
        <div className={styles.form__data}>
          <Input
            className={styles.form__newPassword}
            id={"new-password"}
            type={"password"}
            width={"100%"}
            name={"new-password"}
            placeholder={"New password"}
            onChange={onchangeNewPassword} />
          <Input
            className={styles.form__confirmNewPassword}
            id={"confirm-new-password"}
            type={"password"}
            width={"100%"}
            name={"confirm-new-password"}
            placeholder={"Confirm password"}
            onChange={onchangeConfirmPassword} />
        </div>
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
};

export default ChangePassword;