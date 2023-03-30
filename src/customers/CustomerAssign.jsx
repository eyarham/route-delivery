import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { OrgApiContext } from '../org/OrgApiContextProvider';
import { UserApiContext } from '../user/UserApiContextProvider';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';
import { CustomersApiContext } from './CustomersApiContextProvider';

const CustomerAssign = () => {
  const [customers, setCustomers] = useState([])
  const { user, email, userId } = useContext(UserContext);
  const customersApiContext = useContext(CustomersApiContext);
  const orgApiContext = useContext(OrgApiContext);
  const userApiContext = useContext(UserApiContext);

  useEffect(() => {
    if (!customersApiContext || !user || !email) return
    return customersApiContext.getByEmailSub(email, setCustomers)
  }, [customersApiContext, user, email])

  if (!customersApiContext) return <Spinner />
  if (!customers) return <Spinner />
  return (
    <div>
      {customers.map((d, i) => {
        const onAssignClick = async () => {
          const {orgId} = d.data();
          await customersApiContext.assignUser(d.id, userId);
          await orgApiContext.addUser(orgId, userId, ['customer']);
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

export default CustomerAssign