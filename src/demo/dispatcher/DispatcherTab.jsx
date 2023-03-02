import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import DeliveriesGrid from '../deliveries/DeliveriesGrid'
import { getOrders } from '../orders/api'
import OrdersGrid from '../orders/OrdersGrid'

const DispatcherTab = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    setOrders(getOrders());
  }, []);
  return (
    <Box >
      <h3>Dispatcher Dashboard</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={6}>
          <DeliveriesGrid />
        </Grid>
        <Grid item xs={12} xl={6}>
          <OrdersGrid orders={orders} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DispatcherTab