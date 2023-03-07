import { Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomerListItem from './CustomerListItem';

const CustomersList = ({ customers, onChange }) => {
  const [updatedCustomers, setUpdatedCustomers] = useState(customers || []);

  useEffect(() => {
    if (onChange)
      onChange(updatedCustomers)
  }, [onChange, updatedCustomers])

  const onAddCustomerClick = () => {
    const newCustomer = {}
    setUpdatedCustomers([...updatedCustomers, newCustomer]);
  }
  const onCustomerChange = (key, customer) => {
    updatedCustomers[key] = customer;
    setUpdatedCustomers(updatedCustomers)
    onChange && onChange(updatedCustomers)
  }
  return (
    <Paper sx={{ m: 1, p: 1 }}>
      Customers
      {updatedCustomers && updatedCustomers.map((d, i) => <CustomerListItem key={i} index={i} customer={d} onChange={onCustomerChange} />)}
      {onChange && <Button onClick={onAddCustomerClick}>add customer</Button>}
    </Paper>
  )
}

export default CustomersList