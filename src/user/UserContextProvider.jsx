import React, { createContext, useContext, useEffect, useState } from 'react';
import Spinner from '../_utils/Spinner';
import { UserApiContext } from './UserApiContextProvider';
//import { getByAuthIdSub } from './api';

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [value, setValue] = useState();

  const { getCurrentSub } = useContext(UserApiContext);
  useEffect(() => {
    return getCurrentSub((user, email) => {
      if (user) {
        setValue({ id: user.id, userId: user.id, user: user.data(), email })
      }
      else {
        setValue({ id: null, user: null })
      }
    });
  }, [getCurrentSub])
  if (!value) return <Spinner />
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider