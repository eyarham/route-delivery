import { Button } from '@mui/material';
import React from 'react';
import { getReadableTime } from '../../_utils/_utils';
import DeliveryMap from './DeliveryMap';

const Delivery = ({ delivery, closeDelivery }) => {
  const { id, startTime, assignedDriver, pickups } = delivery;

  return (
    <div>
      <Button onClick={closeDelivery}>Back</Button>
      <div>id: {id}</div>
      <div>start Time: {getReadableTime(startTime)}</div>
      <div>driver: {assignedDriver}</div>
      <div>pickups: {pickups}</div>
      <div>map</div>
      <DeliveryMap />
    </div>
  )
}

export default Delivery