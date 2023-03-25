import React, { createContext, useContext, useEffect, useState } from 'react';
import { OrgApiContext } from '../org/OrgApiContextProvider';
import Spinner from '../_utils/Spinner';
import { UserApiContext } from './UserApiContextProvider';
//import { getByAuthIdSub } from './api';

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [value, setValue] = useState();
  // const [roles, setRoles] = useState();

  const api = useContext(OrgApiContext);
  const { getCurrentSub } = useContext(UserApiContext);
  useEffect(() => {
    return getCurrentSub((user, email) => {
      if (user) {
        // setValue({ id: user.id, userId: user.id, user: user.data(), email })
        const userData = user.data();
        if (userData.activeOrgId)
          return api.getUserRolesInOrgSub(userData.activeOrgId, user.id, roles => {
            setValue({ id: user.id, userId: user.id, user: userData, email, roles })
          });
        else return setValue({ id: user.id, userId: user.id, user: userData, email })
      }
      else {
        setValue({ id: null, user: null })
      }
    });
  }, [getCurrentSub, api])
  if (!value) return <Spinner />
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider