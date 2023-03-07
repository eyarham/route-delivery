import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const CustomerListItem = ({ customer, onChange, index }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState(customer || {})
  useEffect(() => {
    if (onChange)
      onChange(index, updatedCustomer);
  }, [index, onChange, updatedCustomer])
  const onNameChange = e => {
    const name = e.target.value;
    setUpdatedCustomer({ ...updatedCustomer, name });
  }
  const onAddressChange = e => {
    const address = e.target.value;
    setUpdatedCustomer({ ...updatedCustomer, address });
  }
  const { name, address } = updatedCustomer;
  return (<div>
    <TextField placeholder='name' defaultValue={name} onChange={onNameChange}></TextField>
    <TextField placeholder='address' defaultValue={address} onChange={onAddressChange}></TextField>
  </div>)
}

export default CustomerListItem