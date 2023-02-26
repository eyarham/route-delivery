import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import Order from './Order';

const OrdersGrid = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const renderTimeCell = e => {
    const dateTime = e.value;
    const returnString = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}, ${getTwoDigit(dateTime.getHours())}:${getTwoDigit(dateTime.getMinutes())}`;
    return returnString;
  }

  const getTwoDigit = num => {
    if (num > 9) return num
    else return `0${num}`
  }

  
  const renderActionCell = e => {
    return <Button onClick={() => onViewButtonClick(e.row)}>View</Button>
  }

  
  const onViewButtonClick = e => {
    setSelectedOrder(e);
  }
  const closeOrder = () => {
    setSelectedOrder();
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'timeReady', headerName: 'Time Ready', width: 140, renderCell: renderTimeCell },
    { field: 'distance', headerName: 'Distance', width: 140 },
    { field: 'lastName', headerName: 'Last Name', width: 140 },
    { field: '', renderCell: renderActionCell }

  ];

  const rows = [
    { id: 1,  timeReady: new Date("2/22/2023 18:12:00"), distance: "1.5mi", lastName:"Bishop" },
    { id: 2,  timeReady: new Date("2/22/2023 10:33:00"), distance: "2.6mi", lastName:"Smittens" },
    { id: 3,  timeReady: new Date("2/23/2023 06:07:00"), distance: "1.2mi", lastName:"Loggins" },
    { id: 4,  timeReady: new Date("2/24/2023 17:24:00"), distance: "0.8mi", lastName:"Standard" },
    { id: 5,  timeReady: new Date("2/26/2023 09:30:00"), distance: "4.6mi", lastName:"Choof" },
  ];
  if(selectedOrder) return (<div style={{ height: 400, width: '100%' }}><Order order={selectedOrder} close={closeOrder}/></div>)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <h4>Orders Ready For Pickup</h4>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default OrdersGrid