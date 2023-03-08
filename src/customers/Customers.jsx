import { Button, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { OrdersApiContext } from '../orders/OrgApiContextProvider';
import { OrgContext } from '../org/OrgContextProvider';
import { UserContext } from '../user/UserContextProvider';
import { CustomersApiContext } from './CustomerApiContextProvider';
import CustomersGrid from './CustomersGrid';
import NewCustomer from './NewCustomer';

const Customers = () => {
  const [showNew, setShowNew] = useState(false);
  const [customers, setCustomers] = useState([]);
  const { orgId } = useContext(OrgContext);
  const { id: userId } = useContext(UserContext);
  const { getByOrgIdSub, create, deleteDoc } = useContext(CustomersApiContext);
  const { create: createOrder } = useContext(OrdersApiContext);
  useEffect(() => {
    return getByOrgIdSub(orgId, setCustomers);
  }, [getByOrgIdSub, orgId]);
  const toggleShowAdd = () => {
    setShowNew(!showNew);
  }
  const onCreateCustomer = async customer => {
    return await create(customer.name, customer.address, orgId, userId);
  }
  const onDelete = async (id) => {
    await deleteDoc(id);
  }
  const onCreateClick = async customer => {
    await createOrder(customer, userId, orgId);
  }
  return (
    <Paper sx={{ m: 1, p: 1 }}>
      <h4>Customers</h4>
      {!showNew && <Button onClick={toggleShowAdd}>add</Button>}
      {showNew && <NewCustomer onCreate={onCreateCustomer} onCancel={toggleShowAdd} />}
      <CustomersGrid customers={customers} onDelete={onDelete} onCreateClick={onCreateClick} />
    </Paper>
  )
}

export default Customers