import React, { useEffect, useState } from 'react'
import DeliveriesGrid from '../deliveries/DeliveriesGrid'
import { getOrders } from '../orders/api'
import OrdersGrid from '../orders/OrdersGrid'

const DispatcherTab = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    setOrders(getOrders());
  }, []);
  return (
    <div>
      <h3>Dispatcher Dashboard</h3>
      <DeliveriesGrid />
      <OrdersGrid orders={orders} />
    </div>
  )
}

export default DispatcherTab