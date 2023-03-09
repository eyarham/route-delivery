import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import Spinner from '../_utils/Spinner';
import userApi from './_api';

export const UserApiContext = createContext();
const UserApiContextProvider = ({ children }) => {
  const { db, auth } = useContext(FirebaseContext);
  const api = userApi(db, auth);
  if(!api) return <Spinner />
  return (
    <UserApiContext.Provider value={api}>
      {children}
    </UserApiContext.Provider>
  )
}

export default UserApiContextProvider