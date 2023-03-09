import { Button, Paper, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApiContext } from '../user/UserApiContextProvider';
import { UserContext } from '../user/UserContextProvider';
import { OrgApiContext } from './OrgApiContextProvider';

const NewTrialOrg = () => {
  const [name, setName] = useState('');
  const { create } = useContext(OrgApiContext);
  const navigate = useNavigate();
  const { setActiveOrgId } = useContext(UserApiContext);
  const { id: userId } = useContext(UserContext);

  const onSubmitClick = async () => {
    if (name) {
      const newDoc = await create(name, userId, true);
      await setActiveOrgId(userId, newDoc.id);
      return navigate(`/org/${newDoc.id}`)
    }
  }
  const onNameChange = e => {
    setName(e.target.value);
  }
  return (
    <div>   Creating a new Organization
      <Paper sx={{ m: 1, p: 1 }}>
        <TextField onChange={onNameChange} placeholder='organization name'></TextField>
      </Paper>
      <div>
        <Button onClick={onSubmitClick} disabled={!name} variant='contained'>create</Button>
      </div>
    </div>
  )
}

export default NewTrialOrg