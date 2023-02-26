import { Button } from '@mui/material'
import React from 'react'
import { getReadableTime } from '../../_utils/_utils';

const Order = ({order, close}) => {
  const {id, timeReady, distance, lastName} = order;

  return (
    <div>
      <Button onClick={close}>Back</Button>
      <div>id: {id}</div>
      <div>time ready: {getReadableTime(timeReady)}</div>
      <div>distance: {distance}</div>
      <div>last name: {lastName}</div>
    </div>
  )
}

export default Order