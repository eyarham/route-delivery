import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Customers from '../customers/Customers';
import Drivers from '../drivers/Drivers';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';
import { OrgApiContext } from './OrgApiContextProvider';

const Org = () => {
  const [org, setOrg] = useState();
  const { id } = useParams();
  const api = useContext(OrgApiContext);
  const { id: userId } = useContext(UserContext);
  useEffect(() => {
    api.getOrgByIdSub(id, userId, org => {

      setOrg(org);
    })
  }, [api, id, userId])
  if (!org) return <Spinner />
  const { name } = org.data()
  return (
    <div>Org: {name}
          <div>
        <Link to='/dashboard'>dashboard</Link>
      </div>

      <Customers />
      <Drivers />
    </div>
  )
}

export default Org