import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomersList from '../customers/CustomersList';
import DriversList from '../drivers/DriversList';
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
  const { name, drivers, customers } = org.data()
  return (
    <div>Org: {name}
      <DriversList drivers={drivers} />
      <CustomersList customers={customers} />

    </div>
  )
}

export default Org