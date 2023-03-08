import { Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Outlet } from "react-router-dom";
import FirebaseContextProvider from '../firebase/FirebaseContextProvider';
import MenuBar from '../menu/MenuBar';
import UserContextProvider from '../user/UserContextProvider';
import ApiContextProvider from './ApiContextProvider';

const LayoutAnon = () => {
  return (
    <div>
      <FirebaseContextProvider>
        <ApiContextProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <AuthWrapper> */}
          <UserContextProvider allowAnon={true}>
            <MenuBar />
            <Container>
              <Box>
                <Outlet />
              </Box>
            </Container>
          </UserContextProvider>
          {/* </AuthWrapper> */}
        </ApiContextProvider>
      </FirebaseContextProvider>
    </div>
  )
}

export default LayoutAnon