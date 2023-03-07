import { Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Outlet } from "react-router-dom";
import FirebaseContextProvider from '../firebase/FirebaseContextProvider';
import MenuBar from '../menu/MenuBar';
import OrgApiContextProvider from '../org/OrgApiContextProvider';
import UserContextProvider from '../user/UserContextProvider';

const Layout = () => {
  return (
    <div>
      <FirebaseContextProvider>
        <OrgApiContextProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <AuthWrapper> */}
          <UserContextProvider>
            <MenuBar />
            <Container>
              <Box>
                <Outlet />
              </Box>
            </Container>
          </UserContextProvider>
          {/* </AuthWrapper> */}
        </OrgApiContextProvider>
      </FirebaseContextProvider>
    </div>
  )
}

export default Layout