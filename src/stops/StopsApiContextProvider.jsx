import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import stopsApi from './_api';

export const StopsApiContext = createContext()
const StopsApiContextProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const api = stopsApi(db);
  return (
    <StopsApiContext.Provider value={api}>
      {children}
    </StopsApiContext.Provider>
  )
}

export default StopsApiContextProvider