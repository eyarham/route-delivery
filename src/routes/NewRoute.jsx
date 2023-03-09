import { Button, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext, useState } from 'react';
import OrdersGrid from '../orders/OrdersGrid';
import { OrgContext } from '../org/OrgContextProvider';
import { RouteApiContext } from './RouteApiContextProvider';

const NewRoute = ({ orders, close }) => {
  const [value, setValue] = useState(new Date());
  const [driver, setDriver] = useState('')
  const { create } = useContext(RouteApiContext);
  const {orgId} = useContext(OrgContext);
  const onCreateClick = async () => {
    await create(value, orders, driver, orgId);
    
    alert("created delivery");
    close();
  }
  const onDriverChange = e => {
    setDriver(e.target.value);
  }
  return (
    <div>
      <Button onewnClick={close}>Back</Button>
      <h4>New Delivery</h4>
      <div>        
        <Button variant="contained" onClick={onCreateClick}>schedule</Button>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Schedule DateTime"
          value={value}
          onChange={(newValue) => {
            setValue(newValue.$d);
          }}
        />
      </LocalizationProvider>
      <TextField placeholder="driver" onChange={onDriverChange}></TextField>
      <h4>Included orders:</h4>
      <OrdersGrid orders={orders} readonly />

    </div>
  )
}

export default NewRoute