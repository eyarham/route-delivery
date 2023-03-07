import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import Spinner from '../_utils/Spinner';
import orgApi from './_api';

export const OrgApiContext = createContext();
const OrgApiContextProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const api = orgApi(db);
  if(!api) return <Spinner />
  return (
    <OrgApiContext.Provider value={api}>
      {children}
    </OrgApiContext.Provider>
  )
}

export default OrgApiContextProvider