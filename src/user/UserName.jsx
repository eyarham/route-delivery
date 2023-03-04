import React, { useEffect, useState } from 'react';
import { getUserNameSub } from './api';

const UserName = ({ id }) => {
  const [name, setName] = useState("?");
  useEffect(() => {
    if (id) {
      return getUserNameSub(id, setName)
    }
  }, [id])
  return (
    <>{name}</>
  )
}

export default UserName