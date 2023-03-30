import { Button, Checkbox, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { getReadableTime } from '../_utils/_utils';
import { CustomersApiContext } from './CustomersApiContextProvider';

const Customer = ({ customer, id }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState(customer);
  const { name, email, address, createdDate , userId} = customer;
  const [isDirty, setIsDirty] = useState(false);
  const { set } = useContext(CustomersApiContext);
  const onSaveClick = async () => {
    await set(id, updatedCustomer);
  }
  const onNameChange = e => {
    setUpdatedCustomer({ ...updatedCustomer, name: e.target.value });
    setIsDirty(true)

  }
  const onEmailChange = e => {
    setUpdatedCustomer({ ...updatedCustomer, email: e.target.value });
    setIsDirty(true)
  }
  return (
    <div>
      <div>{name}</div>
      <div>{address}</div>
      <div>{getReadableTime(createdDate)}</div>
      <div><TextField onChange={onNameChange} label='name' placeholder='name' defaultValue={name} /></div>
      <div><TextField onChange={onEmailChange} label='email' placeholder='email' defaultValue={email} /></div>
      <div>assigned? <Checkbox checked={userId ? true : false} disabled /></div>
      <div><Button disabled={!isDirty} onClick={onSaveClick}>save</Button></div>

    </div>
  )
}

export default Customer