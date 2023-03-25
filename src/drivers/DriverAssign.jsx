import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { OrgApiContext } from '../org/OrgApiContextProvider';
import { UserApiContext } from '../user/UserApiContextProvider';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';
import { DriversApiContext } from './DriversApiContextProvider';

const DriverAssign = () => {
  const [drivers, setDrivers] = useState([])
  const { user, email, userId } = useContext(UserContext);
  const driversApiContext = useContext(DriversApiContext);
  const orgApiContext = useContext(OrgApiContext);
  const userApiContext = useContext(UserApiContext);

  useEffect(() => {
    if (!driversApiContext || !user || !email) return
    return driversApiContext.getByEmailSub(email, setDrivers)
  }, [driversApiContext, user, email])

  if (!driversApiContext) return <Spinner />
  if (!drivers) return <Spinner />
  return (
    <div>
      {drivers.map((d, i) => {
        const onAssignClick = async () => {
          const {orgId} = d.data();
          await driversApiContext.assignUser(d.id, userId);
          await orgApiContext.addUser(orgId, userId, ['driver']);
          await userApiContext.setActiveOrgId(userId, orgId);
        }
        const { email, name } = d.data();
        return <div key={i}>
          <div>{name}</div>
          <div>{email}</div>
          <div>is this you?</div>
          <div><Button onClick={onAssignClick} variant="contained">this is me</Button></div>
        </div>
      })}
    </div>
  )
}

export default DriverAssign