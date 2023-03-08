import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';
import { OrgApiContext } from './OrgApiContextProvider';
import { OrgContext } from './OrgContextProvider';

const Orgs = () => {
  const [orgs, setOrgs] = useState([])
  const api = useContext(OrgApiContext);
  const navigate = useNavigate();
  const { id: userId } = useContext(UserContext);
  const { setActiveOrg } = useContext(OrgContext);

  useEffect(() => {
    api.getForUserSub(userId, setOrgs)
  }, [api, userId])

  return (
    <div>
      {orgs && orgs.map((o, i) => {
        const { name } = o.data();
        const onSetActiveClick = () => {
          setActiveOrg(o.id)
          navigate(`/org/${o.id}`)
        }
        return <div key={i}>{name} <Button onClick={onSetActiveClick}>set active</Button></div>
      })}
    </div>
  )
}

export default Orgs