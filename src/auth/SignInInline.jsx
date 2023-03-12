import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from 'react';

import { useNavigate } from "react-router-dom";
import { UserApiContext } from "../user/UserApiContextProvider";

const SignInInline = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState();

  const { signIn } = useContext(UserApiContext);

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
    <form>
      <TextField  size="small" style={{height:16}} sx={{ margin: 1, width:200}} placeholder="email" onChange={changeEmail}></TextField>
      <TextField size="small" sx={{ margin: 1, width: 120 }} type="password" placeholder="password" autoComplete="on" onChange={changePassword}></TextField>
      <Button variant="contained" size="small" sx={{ margin: 1 }} onClick={onSignIn}>Sign In</Button>
      <div>{loginErrorMessage}</div>
    </form>
  )
}

export default SignInInline