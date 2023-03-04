import React, { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import userApi from './api';
//import { getByAuthIdSub } from './api';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const { db, auth } = useContext(FirebaseContext);
  const api = userApi(db, auth);
  useEffect(() => {
    const { getCurrentSub } = api;
    return getCurrentSub(setUser);
  }, [api])

  // if (user === undefined || user === null
  // ) {
  //   return <div>loading...</div>
  // }
  return (
    <UserContext.Provider value={{ userId: user && user.id, user: user && user.data(), api }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext };
export default UserContextProvider