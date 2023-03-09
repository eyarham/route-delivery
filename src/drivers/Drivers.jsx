import { Button, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { OrgContext } from '../org/OrgContextProvider';
import { DriversApiContext } from './DriversApiContextProvider';
import DriversGrid from './DriversGrid';
import NewDriver from './NewDriver';

const Drivers = () => {
  const [showNew, setShowNew] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const { orgId } = useContext(OrgContext);
  const { getByOrgIdSub, deleteDoc } = useContext(DriversApiContext);
  useEffect(() => {
    return getByOrgIdSub(orgId, setDrivers);
  }, [getByOrgIdSub, orgId]);
  const toggleShowAdd = () => {
    setShowNew(!showNew);
  }
  const onDelete = async (id) => {
    await deleteDoc(id);
  }
  return (

    <Paper sx={{ m: 1, p: 1 }}>
      <h4>Drivers</h4>
      {!showNew && <Button onClick={toggleShowAdd}>add</Button>}
      {showNew && <NewDriver onCancel={toggleShowAdd} />}
      <DriversGrid drivers={drivers} onDelete={onDelete} />
    </Paper>
  )
}

export default Drivers