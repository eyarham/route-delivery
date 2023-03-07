import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';
import { OrgApiContext } from './OrgApiContextProvider';

export const OrgContext = createContext();
const OrgContextProvider = ({ children }) => {
  const [org, setOrg] = useState();
  const { id } = useContext(UserContext);
  const api = useContext(OrgApiContext);
  useEffect(() => {
    api.getForUserSub(id, orgs => {
      if (orgs.length === 1) {
        const org = orgs[0];
        setOrg(org);
      }
    })
  }, [api, id])
  if (!org) return <Spinner />
  return (
    <OrgContext.Provider value={org}>{children}</OrgContext.Provider>
  )
}

export default OrgContextProvider