import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApiContext } from '../user/UserApiContextProvider';
import { UserContext } from '../user/UserContextProvider';
import { OrgApiContext } from './OrgApiContextProvider';
import { OrgContext } from './OrgContextProvider';

const Orgs = () => {
  const [orgs, setOrgs] = useState([])
  const api = useContext(OrgApiContext);
  const navigate = useNavigate();
  const { id: userId } = useContext(UserContext);
  const { orgId } = useContext(OrgContext);
  const { setActiveOrgId } = useContext(UserApiContext);

  useEffect(() => {
    api.getForUserSub(userId, setOrgs)
  }, [api, userId])

  return (
    <div>
      {orgs && orgs.map((o, i) => {
        const { name } = o.data();
        const onSetActiveClick = async () => {
          await setActiveOrgId(userId, o.id)
          navigate(`/org/${o.id}`)
        }
        const isActive = o.id === orgId
        return <div key={i}>{name} <Button onClick={onSetActiveClick} disabled={isActive} sx={{ m: 0.5 }} variant="contained">set active</Button></div>
      })}
    </div>
  )
}

export default Orgs