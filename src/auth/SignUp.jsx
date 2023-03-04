import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../user/UserContextProvider";
//import userApi from "../user/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const {  api } = useContext(UserContext);
  const { createAccount } = api;

  const onCreateAccount = () => {
    if (password !== confirmPassword) return setLoginErrorMessage("passwords must match")
    createAccount(email, password)
      .then(async (userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        setLoginErrorMessage(errorMessage);
        // ..
      });

  }
  const changeEmail = (e) => {
    setEmail(e.target.value);
  }
  const changePassword = (e) => {
    setPassword(e.target.value);
  }
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }
  return (
    <div>
      sign up or <Link to="/signin">log in to an existing account</Link>
      <form>
        <div>
          <TextField sx={{ margin: 1 }} placeholder="email" onChange={changeEmail}></TextField>
        </div>
        <div>
          <TextField sx={{ margin: 1 }} type="password" placeholder="password" onChange={changePassword}></TextField>
        </div>
        <div>
          <TextField sx={{ margin: 1 }} type="password" placeholder="confirm password" onChange={changeConfirmPassword}></TextField>
        </div>
        <div>
          <Button sx={{ margin: 1 }} onClick={onCreateAccount}>create new user</Button>
        </div>
      </form>
      <div>{loginErrorMessage}</div>
    </div>
  )
}

export default SignUp