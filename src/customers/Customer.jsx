import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { getReadableTime } from '../_utils/_utils';
import { CustomersApiContext } from './CustomerApiContextProvider';

const Customer = ({ customer, id }) => {
  const [updatedDriver, setUpdatedDriver] = useState(customer);
  const { name, email, address, createdDate } = customer;
  const [isDirty, setIsDirty] = useState(false);
  const { set } = useContext(CustomersApiContext);
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
      <div>{name}</div>
      <div>{address}</div>
      <div>{getReadableTime(createdDate)}</div>
      <div><TextField onChange={onNameChange} label='name' placeholder='name' defaultValue={name} /></div>
      <div><TextField onChange={onEmailChange} label='email' placeholder='email' defaultValue={email} /></div>
      <div><Button disabled={!isDirty} onClick={onSaveClick}>save</Button></div>

    </div>
  )
}

export default Customer