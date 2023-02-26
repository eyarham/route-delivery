import { Button } from '@mui/material'
import React from 'react'

const CustomerTab = () => {
  return (
    <div>
      <h3>Customer Dashboard</h3>
      <p>One Bucket</p>
      <div>
        <Button variant="contained">Ready For Pickup</Button>
      </div>
      <div>
        <Button>View History</Button>
      </div>
    </div>
  )
}

export default CustomerTab
