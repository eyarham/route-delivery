import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { UserApiContext } from '../user/UserApiContextProvider';
import { UserContext } from '../user/UserContextProvider';

const Panel = ({ children, showRemove, panelName }) => {
  const { userId, user } = useContext(UserContext);
  const userApiContext = useContext(UserApiContext);
  const onRemoveClick = () => {
    if (user.dashboard) {
      const updatedDashboard = user.dashboard
      const indexToRemove = updatedDashboard.indexOf(panelName);
      updatedDashboard.splice(indexToRemove, 1)
      userApiContext.setDashboard(userId, updatedDashboard)
    }
  }
  return (
    <Box>
      {showRemove && <Button onClick={onRemoveClick}>X</Button>}
      {children}
    </Box>
  )
}

export default Panel