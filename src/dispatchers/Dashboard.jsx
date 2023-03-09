import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Customers from '../customers/Customers'
import Orders from '../orders/Orders'
import { OrgContext } from '../org/OrgContextProvider'
import Routes from '../routes/Routes'

const Dashboard = () => {
  const { orgId } = useContext(OrgContext);
  const orgLink = `/org/${orgId}`;
  return (
    <div>
      <div>
        Dispatcher Dashboard
      </div>
      <div>
        <Link to={orgLink}>org setup</Link>
      </div>
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