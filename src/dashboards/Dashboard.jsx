import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Customers from '../customers/Customers'
import Orders from '../orders/Orders'
import { OrgContext } from '../org/OrgContextProvider'
import Routes from '../routes/Routes'
import { UserContext } from '../user/UserContextProvider'
import Panel from './Panel'
import PanelSelect from './PanelSelect'

const Dashboard = () => {
  const [roleText, setRoleText] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const { roles, user } = useContext(UserContext);
  useEffect(() => {
    if (roles) {
      const role = roles[0]
      setRoleText(role)
    }
  }, [roles])
  const onEditClick = () => { setIsEditMode(!isEditMode) }
  const { orgId } = useContext(OrgContext);
  const orgLink = `/org/${orgId}`;
  return (
    <div>
      <h4>
        {`${roleText} dashboard`}
      </h4>
      <Button onClick={onEditClick}>{isEditMode ? "close edit " : "edit dashboard"}</Button>
      {isEditMode && <PanelSelect />}



      {roleText === 'dispatcher' && <div><Link to={orgLink}>org setup</Link> </div>}

      <div>
        {user.dashboard && user.dashboard.map((p, i) => {
          if (p === 'routes')
            return <Panel key={i} showRemove={isEditMode} panelName="routes"><Routes /></Panel>
          if (p === 'orders')
            return <Panel key={i} showRemove={isEditMode} panelName="orders"><Orders /></Panel>
          if (p === 'customers')
            return <Panel key={i} showRemove={isEditMode} panelName="customers"><Customers /></Panel>
          return <div key={i}></div>
        })}
      </div>
    </div>
  )
}

export default Dashboard