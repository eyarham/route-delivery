import React from 'react'
import DeliveriesGrid from '../deliveries/DeliveriesGrid'
import OrdersGrid from '../orders/OrdersGrid'

const DispatcherTab = () => {
  return (
    <div>
      <h3>Dispatcher Dashboard</h3>
      <DeliveriesGrid />
      <OrdersGrid />
    </div>
  )
}

export default DispatcherTab