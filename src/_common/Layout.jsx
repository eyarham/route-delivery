import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Outlet } from "react-router-dom";
import FirebaseContextProvider from '../firebase/FirebaseContextProvider';
import MenuBar from '../menu/MenuBar';
import OrgContextProvider from '../org/OrgContextProvider';
import UserContextProvider from '../user/UserContextProvider';
import ApiContextProvider from './ApiContextProvider';

const Layout = () => {
  return (
    <FirebaseContextProvider>
      <ApiContextProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <AuthWrapper> */}
        <UserContextProvider>
          <OrgContextProvider>
            <MenuBar />
            <Container maxWidth="xl">
              <Outlet />
            </Container>
          </OrgContextProvider>
        </UserContextProvider>
        {/* </AuthWrapper> */}
      </ApiContextProvider>
    </FirebaseContextProvider>
  )
}

export default Layout