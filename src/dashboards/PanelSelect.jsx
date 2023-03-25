import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserApiContext } from '../user/UserApiContextProvider';
import { UserContext } from '../user/UserContextProvider';

const driverPanels = ["routes"];
const dispatcherPanels = ["routes", "orders", "customers"];
const PanelSelect = () => {
  const [selectedPanel, setSelectedPanel] = useState('');
  const [panels, setAllPanels] = useState([]);
  const { roles, userId, user } = useContext(UserContext);

  const userApiContext = useContext(UserApiContext);
  useEffect(() => {
    if (roles) {
      if (roles.filter(r => r === 'dispatcher').length > 0) {
        return setAllPanels(dispatcherPanels);
      }
      else if (roles.filter(r => r === 'driver').length > 0) {
        return setAllPanels(driverPanels);
      }
    }
  }, [roles])

  useEffect(() => {

  }, [])
  const handleChange = e => {
    setSelectedPanel(e.target.value)
  }
  const onAddClick = () => {
    if (!user.dashboard) return  userApiContext.setDashboard(userId, [selectedPanel])

    if( user.dashboard.indexOf(selectedPanel) < 0) {
      const updatedDashboard = [...(user.dashboard || []), selectedPanel]
      return userApiContext.setDashboard(userId, updatedDashboard)
    }
  }
  return (
    <form>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Panel</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedPanel}
          onChange={handleChange}
          autoWidth
          label="Panel"
        >
          {panels && panels.map((p, i) => <MenuItem key={i} value={p}>{p}</MenuItem>)}
        </Select>
      </FormControl>
      <Button onClick={onAddClick}>add</Button>
    </form>
  )
}

export default PanelSelect