import { Button, Checkbox, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { DriversApiContext } from './DriversApiContextProvider';

const Driver = ({ driver, id }) => {
  const [updatedDriver, setUpdatedDriver] = useState(driver);
  const [isDirty, setIsDirty] = useState(false);
  const { name, email, userId } = driver;
  const { set } = useContext(DriversApiContext);
  const onSaveClick = async () => {

    await set(id, updatedDriver);
  }
  const onNameChange = e => {
    setUpdatedDriver({ ...updatedDriver, name: e.target.value });
    setIsDirty(true)

  }
  const onEmailChange = e => {
    setUpdatedDriver({ ...updatedDriver, email: e.target.value });
    setIsDirty(true)
  }
  return (
    <div>
      <div><TextField onChange={onNameChange} label='name' placeholder='name' defaultValue={name} /></div>
      <div><TextField onChange={onEmailChange} label='email' placeholder='email' defaultValue={email} /></div>
      <div>assigned? <Checkbox checked={userId ? true : false} disabled /></div>
      <div><Button disabled={!isDirty} onClick={onSaveClick}>save</Button></div>
    </div>
  )
}

export default Driver