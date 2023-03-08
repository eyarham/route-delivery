import { Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { OrgContext } from '../org/OrgContextProvider';
import { RouteApiContext } from './RouteApiContextProvider';
import RoutesGrid from './RoutesGrid';

const Routes = () => {
  const [routes, setRoutes] = useState([]);

  const { orgId } = useContext(OrgContext);
  const { getUpcomingSub } = useContext(RouteApiContext);
  useEffect(() => {
    return getUpcomingSub(orgId, setRoutes)
  }, [getUpcomingSub, orgId]);

  return (
    <Paper sx={{ m: 1, p: 1 }}>      
      <h4>Upcoming Routes</h4>
      <RoutesGrid routes={routes} />
    </Paper>
  )
}

export default Routes