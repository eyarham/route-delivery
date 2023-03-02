import { Button, Chip, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getReadableTime } from '../../_utils/_utils';
import MapContainer from '../map/MapContainer';
import { getOrders } from '../orders/api';

const Delivery = ({ delivery, closeDelivery }) => {
  const [destinations, setDestinations] = useState();
  const {  startTime, assignedDriver, pickups } = delivery;
  useEffect(() => {
    if (!delivery) return;

    const orders = getOrders().slice(0, pickups);

    setDestinations(orders.map(o => o.coords))
  }, [delivery, pickups])
  return (
    <div>
      <Button onClick={closeDelivery}>Back</Button>
      <Stack direction="row" spacing={1} sx={{marginBottom:2}}>
        <Chip variant="outlined" label={`${getReadableTime(startTime)}`} />
        <Chip variant="outlined" label={`Driver: ${assignedDriver}`} />
        <Chip variant="outlined" label={`${pickups} pickups`} />
      </Stack>
      <MapContainer destinationArr={destinations} />
    </div>
  )
}

export default Delivery