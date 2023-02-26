import { Button } from '@mui/material'
import React from 'react'
import DeliveriesGrid from '../deliveries/DeliveriesGrid'

const DriverTab = () => {
  return (
    <div>
      <h3>Driver Dashboard</h3>
      Hello, Starre!
      <div>
      <DeliveriesGrid driver="Starre" />   </div>
      <div>
        <Button variant="contained">View History</Button>
      </div>
    </div>
  )
}

export default DriverTab