import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from 'react';

import { useNavigate } from "react-router-dom";
import { UserApiContext } from "../user/UserApiContextProvider";
const SignIn = () => {
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
      <div>
        <TextField sx={{ margin: 1 }} placeholder="email" onChange={changeEmail}></TextField>
      </div>
      <div>
        <TextField sx={{ margin: 1 }} type="password" placeholder="password" autoComplete="on" onChange={changePassword}></TextField>
      </div>
      <div>
        <Button sx={{ margin: 1 }} onClick={onSignIn}>Sign In</Button>
      </div>
      <div>{loginErrorMessage}</div>
    </form>
  )
}

export default SignIn