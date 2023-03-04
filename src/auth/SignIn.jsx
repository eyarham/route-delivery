import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../user/UserContextProvider";
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const { api } = useContext(UserContext);
  const { signIn } = api;

  const onSignIn = () => {
    signIn(email, password)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        // ...
        navigate('/');
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        setLoginErrorMessage(errorMessage);
      });

  }
  const changeEmail = (e) => {
    setEmail(e.target.value);
  }
  const changePassword = (e) => {
    setPassword(e.target.value);
  }
  return (
    <div>
      sign in or <Link to="/signup">create an account</Link>
      <form>
        <div>
          <TextField sx={{ margin: 1 }} placeholder="email" onChange={changeEmail}></TextField>
        </div>
        <div>
          <TextField sx={{ margin: 1 }} type="password" placeholder="password" autoComplete="on" onChange={changePassword}></TextField>
        </div>
        <div>
          <Button sx={{ margin: 1 }} onClick={onSignIn}>Sign In</Button>
        </div>
      </form>
      <div>{loginErrorMessage}</div></div>
  )
}

export default SignIn