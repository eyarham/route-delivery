import { Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { OrgContext } from '../org/OrgContextProvider';
import { StopsApiContext } from './StopsApiContextProvider';

const Stops = () => {
  const [stops, setStops] = useState([]);
  const { getReadySub } = useContext(StopsApiContext)
  const { orgId } = useContext(OrgContext);
  useEffect(() => {
    return getReadySub(orgId, setStops)
  }, [getReadySub, orgId])
  return (
    <Paper>
      {stops && stops.map((s, i) => <div key={i}>s.data().address</div>)}
    </Paper>
  )
}

export default Stops