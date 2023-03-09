import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import Spinner from '../_utils/Spinner';
import driversApi from './_api';

export const DriversApiContext = createContext();
const DriversApiContextProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const api = driversApi(db);
  if(!api) return <Spinner />
  return (
    <DriversApiContext.Provider value={api}>
      {children}
    </DriversApiContext.Provider>
  )
}

export default DriversApiContextProvider