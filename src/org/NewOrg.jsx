import { Button, Paper, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomersList from '../customers/CustomersList';
import DriversList from '../drivers/DriversList';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import orgApi from '../org/_api';
import { UserContext } from '../user/UserContextProvider';

const NewOrg = () => {
  const navigate  = useNavigate();
  const [name, setName] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { create } = orgApi(db);
  const { id: userId } = useContext(UserContext);
  const onSubmitClick = async () => {
    if (isValid)
    {
      const newDoc = await create(name, drivers, customers, userId);
      return navigate(`/org/${newDoc.id}`)
    }
  }

  useEffect(() => {
    if (name && drivers && drivers.length > 0 && customers && customers.length > 0)
      setIsValid(true);
  }, [name, drivers, customers]);

  const onNameChange = e => {
    setName(e.target.value);
  }

  const onDriversChange = changedDrivers => {
    setDrivers(changedDrivers);
  }
  const onCustomersChange = changedCustomers => {
    setCustomers(changedCustomers);
  }
  return (
    <div>
      Creating a new Organization
      <Paper sx={{ m: 1, p: 1 }}>
        <TextField onChange={onNameChange} placeholder='organization name'></TextField>
      </Paper>
      <DriversList onChange={onDriversChange} />
      <CustomersList customers={customers} onChange={onCustomersChange} />
      <div>
        <Button onClick={onSubmitClick} disabled={!isValid} variant='contained'>create</Button>
      </div>
    </div>
  )
}

export default NewOrg