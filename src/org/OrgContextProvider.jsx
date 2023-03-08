import { Button } from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';
import { OrgApiContext } from './OrgApiContextProvider';

export const OrgContext = createContext();
const OrgContextProvider = ({ children }) => {
  const [org, setOrg] = useState();
  const [activeOrgId, setActiveOrgId] = useState("LOIZzHkmJZRAs7XyTADz");
  const { id } = useContext(UserContext);

  const navigate = useNavigate();
  const api = useContext(OrgApiContext);
  useEffect(() => {
    if (id) {
      if (activeOrgId) {
        api.getOrgByIdSub(activeOrgId, id, org => {
          setOrg(org);
        })
      }
    }
  }, [api, activeOrgId, id])
  const onChangeClick = () => {
    navigate('/orgs')
  }

  const setActiveOrg = (orgId) => {
    setActiveOrgId(orgId);
  }

  if (!org) return <Spinner />
  return (
    <OrgContext.Provider value={{ orgId: org.id, org: org.data(), setActiveOrg }}>
      org: {org.data().name}
      <Button onClick={onChangeClick}>change</Button>
      {children}
    </OrgContext.Provider>
  )
}

export default OrgContextProvider