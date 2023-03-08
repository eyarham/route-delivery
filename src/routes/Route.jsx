import { Button, Chip, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MapContainer from '../map/MapContainer';
import { getReadableTime } from '../_utils/_utils';

const Route = ({ route, onClose }) => {
  const [destinations, setDestinations] = useState();
  const { startTime, driver, stopsCount } = route;
  useEffect(() => {
    if (!route) return;
    setDestinations(route.stops.map(o => o.customer.coords))
  }, [route])
  return (
    <div>
      <Button onClick={onClose}>Back</Button>
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
        <Chip variant="outlined" label={`${getReadableTime(startTime)}`} />
        <Chip variant="outlined" label={`Driver: ${driver}`} />
        <Chip variant="outlined" label={`${stopsCount} pickups`} />
      </Stack>
      <MapContainer destinations={destinations} />
    </div>
  )
}

export default Route