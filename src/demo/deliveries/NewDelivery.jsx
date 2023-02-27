import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import OrdersGrid from '../orders/OrdersGrid';

const NewDelivery = ({ orders, close }) => {
  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const onCreateClick = ()=>{
    alert("created delivery");
    close();
  }
  return (
    <div>
      <Button onClick={close}>Back</Button>
      <h4>New Delivery</h4>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Schedule DateTime"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </LocalizationProvider>
      <h4>Included orders:</h4>
      <OrdersGrid orders={orders} readonly/>
      <Button variant="contained" onClick={onCreateClick}>Create</Button>

    </div>
  )
}

export default NewDelivery