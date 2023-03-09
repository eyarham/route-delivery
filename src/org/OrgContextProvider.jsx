import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/UserContextProvider';
import { OrgApiContext } from './OrgApiContextProvider';

export const OrgContext = createContext();
const OrgContextProvider = ({ children }) => {
  const [value, setValue] = useState();
  const { id, user } = useContext(UserContext);


  const api = useContext(OrgApiContext);
  useEffect(() => {
    if (id) {
      if (user && user.activeOrgId) {
        api.getOrgByIdSub(user.activeOrgId, id, org => {
          return setValue({ orgId: org.id, org: org.data() });
        })
      }
    }
    setValue({ orgId: null, org: null });

  }, [api, id, user])


  return (
    <OrgContext.Provider value={value}>
      {children}
    </OrgContext.Provider>
  )
}

export default OrgContextProvider