import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import Spinner from '../_utils/Spinner';
import ordersApi from './_api';

export const OrdersApiContext = createContext();
const OrdersApiContextProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const api = ordersApi(db);
  if(!api) return <Spinner />
  return (
    <OrdersApiContext.Provider value={api}>
      {children}
    </OrdersApiContext.Provider>
  )
}

export default OrdersApiContextProvider