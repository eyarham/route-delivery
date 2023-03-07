import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';
import { OrgApiContext } from './OrgApiContextProvider';

const Orgs = () => {
  const [orgs, setOrgs] = useState([])
  const api = useContext(OrgApiContext);
  const navigate = useNavigate();
  const { id: userId } = useContext(UserContext);

  useEffect(() => {
    api.getForUserSub(userId, setOrgs)
  }, [api, userId])

  return (
    <div>
      {orgs && orgs.map((o, i) => {
        const { name } = o.data();
        const onOrgClick = () => {
          navigate(`/org/${o.id}`)
        }
        return <div onClick={onOrgClick} key={i}>{name} </div>
      })}
    </div>
  )
}

export default Orgs