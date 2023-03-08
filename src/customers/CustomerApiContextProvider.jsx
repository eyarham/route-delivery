import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import Spinner from '../_utils/Spinner';
import customersApi from './_api';

export const CustomersApiContext = createContext();
const CustomersApiContextProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const api = customersApi(db);
  if(!api) return <Spinner />
  return (
    <CustomersApiContext.Provider value={api}>
      {children}
    </CustomersApiContext.Provider>
  )
}

export default CustomersApiContextProvider