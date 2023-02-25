import React from 'react';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h2>Route Delivery</h2>
      <Outlet />
    </div>
  )
}

export default Layout