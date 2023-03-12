import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(userContext && userContext.user)
  }, [userContext]);
  const onTryDemoClick = () => {
    navigate('/demo');
  }

  const onCreateTrialClick = () => {
    navigate('/startTrial');
  }

  return (
    <div>
      <h2>route delivery</h2>
      <p>this app is to help org to organize and communicate route scheduling</p>
      <p>everything is free but you do have to sign in to create a trial org</p>
      <Button onClick={onTryDemoClick} variant="contained" sx={{ m: 1 }}>try the demo org</Button>
      <Button onClick={onCreateTrialClick} disabled={!isLoggedIn} variant="contained" sx={{ m: 1 }}>start a trial org</Button>
    </div>
  )
}

export default Home