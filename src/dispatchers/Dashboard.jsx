import React from 'react'
import Customers from '../customers/Customers'
import Orders from '../orders/Orders'
import Routes from '../routes/Routes'

const Dashboard = () => {
  return (
    <div>
      <div>
        Dispatcher Dashboard</div>
      <div>
        <Routes />
      </div>
      <div>
        <Orders />
      </div>
      <div>
        <Customers />
      </div>
    </div>
  )
}

export default Dashboard