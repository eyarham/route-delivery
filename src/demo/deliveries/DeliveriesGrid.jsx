import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Spinner from '../../_utils/Spinner';
import { getDeliveries } from './api';
import Delivery from './Delivery';


const DeliveriesGrid = ({ driver }) => {
  const [rows, setRows] = useState();
  const [selectedDelivery, setSelectedDelivery] = useState();
  useEffect(() => {
    if (!driver) return setRows(getDeliveries());
    else {
      const driverRows = getDeliveries().filter(r => r.assignedDriver === driver)
      return setRows(driverRows);
    }
  }, [driver])
  const renderTimeCell = e => {
    const dateTime = e.value;
    const returnString = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}, ${getTwoDigit(dateTime.getHours())}:${getTwoDigit(dateTime.getMinutes())}`;
    return returnString;
  }

  const getTwoDigit = num => {
    if (num > 9) return num
    else return `0${num}`
  }
  const onViewButtonClick = e => {
    setSelectedDelivery(e);
  }

  const closeDelivery = () => {
    setSelectedDelivery();
  }

  const renderActionCell = e => {
    return <Button onClick={() => onViewButtonClick(e.row)}>View</Button>
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'startTime',
      headerName: 'Start Time',
      renderCell: renderTimeCell,
      width: 140
    },
    { field: 'assignedDriver', headerName: 'Assigned Driver', width: 160 },
    { field: 'pickups', headerName: '# Pickups', type: 'number', },
    { field: '', renderCell: renderActionCell }

  ];
  if (!rows) return <Spinner />
  if (selectedDelivery) return (<div style={{ height: 400, width: '100%', marginBottom: 60 }}>
    <Delivery delivery={selectedDelivery} closeDelivery={closeDelivery} /></div>)
  return (
    <div style={{ height: 400, width: '100%', marginBottom: 60 }}>
      <h4>Upcoming Deliveries</h4>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default DeliveriesGrid