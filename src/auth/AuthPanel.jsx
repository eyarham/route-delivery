import { Paper } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthPanel = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const toggleShow = () => {
    setShowSignUp(!showSignUp);
  }
  return (
    <Paper variant="outlined" sx={{ margin: "6px auto", p: 1, width: "fit-content" }}>
      {showSignUp && <div>sign up or <Link to="#" onClick={toggleShow}>log in to an existing account</Link></div>}
      {!showSignUp && <div>sign in or <Link to="#" onClick={toggleShow}>create a new account</Link></div>}

      {!showSignUp && <SignIn />}
      {showSignUp && <SignUp />}
    </Paper>

  )
}

export default AuthPanel