
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPanel from '../auth/AuthPanel';
import Logout from '../auth/Logout';
import Config from '../config/Config';
import Demo from '../demo/Demo';
import Dashboard from '../dispatchers/Dashboard';
import Home from '../home/Home';
import NewTrialOrg from '../org/NewTrialOrg';
import Org from '../org/Org';
import Orgs from '../org/Orgs';
import AccountTabs from '../user/account/AccountTabs';
import Layout from './Layout';
import LayoutUser from './LayoutUser';

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/signin" element={<AuthPanel />} />
          <Route path="/signup" element={<AuthPanel />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<LayoutUser />}>
            <Route path="/dashboard" element={<Dashboard />} />         
               <Route path="/startTrial" element={<NewTrialOrg />} />
            <Route path="/orgs" element={<Orgs />} />
            <Route path="/org" element={<Org />} />
            <Route path="/org/:id" element={<Org />} />
            <Route path="/config" element={<Config />} />
            <Route path="/account" element={<AccountTabs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router