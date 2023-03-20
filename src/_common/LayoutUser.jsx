import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OrgContext } from '../org/OrgContextProvider';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';

const LayoutUser = () => {
  const { user } = useContext(UserContext);
  const orgContext = useContext(OrgContext);
  if (!user) return <Link to={"/signin"}>login or sign up</Link>
  if (!orgContext) return <Spinner />

  return (
    <Outlet />
  )
}

export default LayoutUser