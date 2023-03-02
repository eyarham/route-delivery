import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeliveryMap from './DeliveryMap'
import { getDirections } from '../deliveries/directions'
import { getOriginCoords } from '../orders/api'
import Instructions from './Instructions'

const MapContainer = ({ destinationArr }) => {
  const [legs, setLegs] = useState()
  const [destinations, setDestinations] = useState()
  const [pinCoords, setPinCoords] = useState()
  const [routeCoords, setRouteCoords] = useState()

  useEffect(() => {
    const destinations = destinationArr;
    setDestinations(destinations);
  }, [destinationArr])

  useEffect(() => {
    if(!destinations) return    
    const eff = async () => {
      const data = await getDirections(getOriginCoords(), destinations);
      const { routes, waypoints } = data;
      const { legs, geometry } = routes[0];
      setPinCoords(waypoints);
      setRouteCoords(geometry.coordinates);
      setLegs(legs);
    }
    eff();
  }, [destinations])
  if (!destinations || !pinCoords || !routeCoords) return <div>loading...</div>
  return (
    <Grid container spacing={1} sx={{height:200}}>
      <Grid item xs={6} xl={6}>
        <DeliveryMap pinCoords={pinCoords} routeCoords={routeCoords} />
      </Grid>
      <Grid item xs={6} xl={6}>
        <Instructions legs={legs} />
      </Grid>
    </Grid>
  )
}

export default MapContainer