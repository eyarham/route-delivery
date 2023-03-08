import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

const NewCustomer = ({ onCreate, onCancel }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const onNameChange = e => {
    setName(e.target.value);
  }
  const onAddressChange = e => {
    setAddress(e.target.value);
  }
  const onCreateClick = () => {
    onCreate({ name, address })
    setName('');
    setAddress('');
  }
  return (
    <Paper>
      <TextField onChange={onNameChange} value={name} placeholder="name"></TextField>
      <TextField onChange={onAddressChange} value={address} placeholder="address"></TextField>
      <Button onClick={onCreateClick}>create</Button>
      <Button onClick={onCancel}>cancel</Button>
    </Paper>
  )
}

export default NewCustomer