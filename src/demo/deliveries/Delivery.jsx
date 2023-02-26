import { Button } from '@mui/material';
import React from 'react';

const Delivery = ({ delivery, closeDelivery }) => {
  const { id, startTime, assignedDriver, pickups } = delivery;
  const renderTimeCell = dateTime => {
    const returnString = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}, ${getTwoDigit(dateTime.getHours())}:${getTwoDigit(dateTime.getMinutes())}`;
    return returnString;
  }
  const getTwoDigit = num => {
    if (num > 9) return num
    else return `0${num}`
  }
  return (
    <div>
      <Button onClick={closeDelivery}>Back</Button>
      <div>id: {id}</div>
      <div>start Time: {renderTimeCell(startTime)}</div>
      <div>driver: {assignedDriver}</div>
      <div>pickups: {pickups}</div>
    </div>
  )
}

export default Delivery