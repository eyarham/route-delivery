import { Button, Paper, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { OrgContext } from '../org/OrgContextProvider';
import { UserContext } from '../user/UserContextProvider';
import Autofill from '../_utils/AddressAutofill';
import { CustomersApiContext } from './CustomerApiContextProvider';

const NewCustomer = ({  onCancel }) => {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState('');
  const { orgId } = useContext(OrgContext);
  const { id: userId } = useContext(UserContext);
  const { create, } = useContext(CustomersApiContext);
  useEffect(() => {
    if (name && coords && address)
      setIsValid(true)
    else setIsValid(false)
  }, [name, coords, address])
  const onNameChange = e => {
    setName(e.target.value);
  }
  const onAddressChange = (address, coords) => {
    setAddress(address);
    setCoords(coords);
  }
  const onCreateClick = async () => {
    await create(name, address, coords, orgId, userId);
    setName('');
    setAddress('');
  }
  return (
    <Paper>
      <TextField onChange={onNameChange} value={name} placeholder="name"></TextField>
      {/* <TextField onChange={onAddressChange} value={address} placeholder="address"></TextField> */}
      <Autofill onChange={onAddressChange}setValue={onAddressChange} value={address} placeholder="address" />

      <Button disabled={!isValid} onClick={onCreateClick}>create</Button>
      <Button onClick={onCancel}>cancel</Button>
    </Paper>
  )
}

export default NewCustomer