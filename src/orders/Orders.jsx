import React, { useContext, useEffect, useState } from 'react';
import { OrgContext } from '../org/OrgContextProvider';
import OrdersGrid from './OrdersGrid';
import { OrdersApiContext } from './OrgApiContextProvider';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { orgId } = useContext(OrgContext);
  const { getReadySub, cancel } = useContext(OrdersApiContext);
  useEffect(() => {
    return getReadySub(orgId, setOrders)
  }, [getReadySub, orgId])
  const onDelete = async (id) => {
    await cancel(id);
  }
  return (
    <div>
      <OrdersGrid orders={orders} onDelete={onDelete}/>
    </div>
  )
}

export default Orders