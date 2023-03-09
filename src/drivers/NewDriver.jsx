import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { OrgContext } from '../org/OrgContextProvider';
import { UserContext } from '../user/UserContextProvider';
import { DriversApiContext } from './DriversApiContextProvider';

const NewDriver = () => {
  const [name, setName] = useState()
  const { create } = useContext(DriversApiContext);
  const { orgId } = useContext(OrgContext);
  const { userId } = useContext(UserContext);
  const onNameChange = e => {
    setName(e.target.value);
  }
  const onCreateClick = async () => {
    await create(orgId, name, userId)
  }
  return (
    <form onSubmit={onCreateClick}>
      <TextField onChange={onNameChange} placeholder="name"></TextField>
      <Button onClick={onCreateClick}>create</Button>
    </form>
  )
}

export default NewDriver