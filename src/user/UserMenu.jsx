import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';

const UserMenu = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext)
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [userInitial, setUserInitial] = useState(null);

  const [settingLinks, setSettingLinks] = useState([]);


  useEffect(() => {
    if (user) {
      setSettingLinks([{ text: 'Account', value: 'account' }, { text: 'Logout', value: 'logout' }])
    }
    else {
      setSettingLinks([{ text: 'Login', value: 'signin' }])
    }
  }, [user])
  useEffect(() => {
    if (user) {
      const {displayName } = user;
      setUserInitial(displayName.charAt(0) || null)
    }
   else  setUserInitial()
  }, [user])


  const navigateToSelected = (destination, isExternal) => {
    if (isExternal) { window.open(destination, '_blank') }
    else {
      navigate('/' + destination);
    }
  }


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar>{userInitial}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settingLinks.map((setting) => (
          <MenuItem key={setting.value} onClick={() => navigateToSelected(setting.value, setting.isExternal)}>
            <Typography textAlign="center">{setting.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserMenu