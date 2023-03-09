import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../config/ConfigContextProvider'
import { OrgContext } from '../org/OrgContextProvider'
import { getDirections } from '../_common/directions'
import Spinner from '../_utils/Spinner'
import DeliveryMap from './DeliveryMap'
import Instructions from './Instructions'

const MapContainer = ({ destinations }) => {
  const [legs, setLegs] = useState()
  const [pinCoords, setPinCoords] = useState()
  const [routeCoords, setRouteCoords] = useState()
  const [hasRendered, setHasRendered] = useState(false)
  const { org } = useContext(OrgContext);
  const {mapBoxAccessToken} = useContext(ConfigContext);
  useEffect(() => {
    if (!destinations || hasRendered) return
    const eff = async () => {
      const { coords } = org;
      const data = await getDirections(coords, destinations, mapBoxAccessToken);
      const { routes, waypoints } = data;
      const { legs, geometry } = routes[0];
      setPinCoords(waypoints);
      setRouteCoords(geometry.coordinates);
      setLegs(legs);
      setHasRendered(true);
    }
    eff();
  }, [destinations, hasRendered, org])
  if (!destinations || !pinCoords || !routeCoords) return <Spinner />
  return (
    <Grid container spacing={1} sx={{ height: 200 }}>
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