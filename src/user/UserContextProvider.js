import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import userApi from './api';
//import { getByAuthIdSub } from './api';

export const UserContext = createContext();
const UserContextProvider = ({ children, allowAnon }) => {
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
  if(!user && !allowAnon) return <Link to={"/signin"}>login or sign up</Link>
  return (
    <UserContext.Provider value={{ id: user && user.id, user: user && user.data(), api }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider