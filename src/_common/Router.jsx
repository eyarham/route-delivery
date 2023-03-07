import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from '../auth/Logout';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Config from '../config/Config';
import Demo from '../demo/Demo';
import Start from '../home/Start';
import Org from '../org/Org';
import Orgs from '../org/Orgs';
import AccountTabs from '../user/account/AccountTabs';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Demo />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/start" element={<Start />} />
          <Route path="/orgs" element={<Orgs />} />
          <Route path="/org" element={<Org />} />
          <Route path="/org/:id" element={<Org />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/config" element={<Config />} />
          <Route path="/account" element={<AccountTabs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router