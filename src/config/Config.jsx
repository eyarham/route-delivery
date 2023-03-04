import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';
import configApi from './api';

const Config = () => {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState();
  const [updatedApiNinjasApiKey, setUpdatedApiNinjasApiKey] = useState();
  const [existingConfig, setExistingConfig] = useState();
  const {db} =useContext( FirebaseContext);
  const {getActiveConfigSub, updateConfigValue } = configApi(db);
  useEffect(() => {
    if (user && user.data().isAdmin) { setIsAdmin(true) }
  }, [user]);

  useEffect(() => {
    getActiveConfigSub(setExistingConfig);
  }, [getActiveConfigSub])

  const onChangeApiKey = e => {
    setUpdatedApiNinjasApiKey(e.target.value);
  }

  const onSaveClick = async () => {
    await updateConfigValue({ apiNinjasApiKey: updatedApiNinjasApiKey });
    alert("saved successfully");
  }

  if (!isAdmin) return <div>you are not authorized</div>
  if (!existingConfig) return <Spinner />
  const { apiNinjasApiKey } = existingConfig.data();
  return (
    <Box sx={{ m: 1 }}>
      <h3>config</h3>
      <div>
        <TextField placeholder="apiNinjasApiKey"
          defaultValue={apiNinjasApiKey}
          onChange={onChangeApiKey} /></div>
      <Button variant="contained" onClick={onSaveClick}>Save</Button>
    </Box>
  )
}

export default Config