import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getReadableTime } from '../../_utils/_utils';
import { getOrders } from '../orders/api';
import DeliveryMap from './DeliveryMap';

const Delivery = ({ delivery, closeDelivery }) => {
  const [destinations, setDestinations] = useState();
  const { id, startTime, assignedDriver, pickups } = delivery;
  useEffect(() => {
    if (!delivery) return;

    const orders = getOrders().slice(0,pickups);

    setDestinations(orders.map(o => o.coords))
  }, [delivery, pickups])
  return (
    <div>
      <Button onClick={closeDelivery}>Back</Button>
      <div>id: {id}</div>
      <div>start Time: {getReadableTime(startTime)}</div>
      <div>driver: {assignedDriver}</div>
      <div>pickups: {pickups}</div>
      <DeliveryMap destinationArr={destinations} />
    </div>
  )
}

export default Delivery