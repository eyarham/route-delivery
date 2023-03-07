import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const DriverListItem = ({ driver, onChange, index }) => {
  const [updatedDriver, setUpdatedDriver] = useState(driver || {})
  useEffect(() => {
    if (onChange)
      onChange(index, updatedDriver);
  }, [index, onChange, updatedDriver])
  const onNameChange = e => {
    const name = e.target.value;
    setUpdatedDriver({ ...updatedDriver, name });
  }
  const {name} = updatedDriver;
  return (<div>
    <TextField placeholder='name' onChange={onNameChange} defaultValue={name}></TextField>
  </div>)
}

export default DriverListItem