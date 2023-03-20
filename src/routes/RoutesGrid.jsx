import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Spinner from '../_utils/Spinner';
import { renderTimeCell } from '../_utils/_utils';
import Route from './Route';


const RoutesGrid = ({ routes }) => {
  const [rows, setRows] = useState();
  useEffect(() => {
    const routeRows = routes.map(r => {
      const data = r.data();
      data.id = r.id;
      return data
    })
    setRows(routeRows)
  }, [routes])

  const [selectedRoute, setSelectedRoute] = useState();
  const onViewButtonClick = e => {
    setSelectedRoute(e);
  }
  const closeRoute = () => {
    setSelectedRoute();
  }

  const onCancel=row=>{
    
  }
  const renderActionCell = e => {
    return <Button onClick={() => onViewButtonClick(e.row)}>View</Button>
  }
  const renderCancelCell = e => {
    return <Button onClick={() => onCancel(e.row)}>cancel</Button>
  }

  const columns = [
    {
      field: 'startTime',
      headerName: 'Start Time',
      renderCell: renderTimeCell,
      width: 140
    },
    { field: 'driver', headerName: 'Assigned Driver', width: 160 },
    { field: 'stopsCount', headerName: '# Stops', type: 'number', },
    { field: 'view', renderCell: renderActionCell },
    { field: 'cancel', renderCell: renderCancelCell }

  ];
  if (!rows) return <Spinner />
  if (selectedRoute) return (<div style={{ width: '100%', marginBottom: 60 }}>
    <Route route={selectedRoute} onClose={closeRoute} /></div>)
  return (
    <Box sx={{ height: 400, marginBottom: 6 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  )
}

export default RoutesGrid