import { Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DriverListItem from './DriverListItem';

const DriversList = ({ drivers, onChange }) => {
  const [updatedDrivers, setUpdatedDrivers] = useState(drivers || []);

  useEffect(() => {
    if (onChange)
      onChange(updatedDrivers)
  }, [onChange, updatedDrivers])

  const onAddDriverClick = () => {
    const newDriver = {}
    setUpdatedDrivers([...updatedDrivers, newDriver]);
  }
  const onDriverChange = (key, driver) => {
    if (onChange) {
      updatedDrivers[key] = driver;
      setUpdatedDrivers(updatedDrivers)
      onChange(updatedDrivers)
    }
  }
  return (
    <Paper sx={{ m: 1, p: 1 }}>
      Drivers
      {updatedDrivers && updatedDrivers.map((d, i) => <DriverListItem key={i} index={i} driver={d} onChange={onDriverChange} />)}
      {onChange && <Button onClick={onAddDriverClick}>add driver</Button>}

    </Paper>
  )
}

export default DriversList