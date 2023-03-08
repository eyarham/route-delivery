import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import routeApi from './_api';

export const RouteApiContext = createContext()
const RouteApiContextProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const api = routeApi(db);
  return (
    <RouteApiContext.Provider value={api}>
      {children}
    </RouteApiContext.Provider>
  )
}

export default RouteApiContextProvider