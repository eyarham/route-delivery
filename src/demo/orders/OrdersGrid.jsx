import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import NewDelivery from '../deliveries/NewDelivery';
import Order from './Order';



const OrdersGrid = ({ orders, readonly }) => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedOrders, setSelectedOrders] = useState();
  const [showNewDelivery, setShowNewDelivery] = useState();
  const rows = orders;
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'timeReady', headerName: 'Time Ready', width: 140, renderCell: renderTimeCell },
    { field: 'coords', headerName: 'Coords', width: 140 },
    { field: 'lastName', headerName: 'Last Name', width: 140 },
    { field: '', renderCell: renderActionCell }

  ];
  const onViewButtonClick = e => {
    setSelectedOrder(e);
  }
  const closeOrder = () => {
    setSelectedOrder();
  }

  const onSelectChange = e => {

    const newSelectedOrders = rows.filter(r => e.includes(r.id))
    setSelectedOrders(newSelectedOrders);
  }
  const createDelivery = () => {
    setShowNewDelivery(true);
  }
  const closeNewDelivery = () => {
    setShowNewDelivery(false);
  }
  if (selectedOrder) return (<div style={{ height: 400, width: '100%' }}><Order order={selectedOrder} close={closeOrder} /></div>)
  if (showNewDelivery) return (<div style={{ height: 400, width: '100%' }}><NewDelivery orders={selectedOrders} close={closeNewDelivery} /></div>)
  return (
    <div style={{ height: 400, width: '100%' }}>
      {!readonly && <h4>Orders Ready For Pickup</h4>}
      {!readonly && <Button disabled={!selectedOrders || selectedOrders.length < 1} variant="contained" onClick={createDelivery}>Create Delivery For Selected</Button>}
      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={!readonly}
        onSelectionModelChange={onSelectChange}
      />
    </div>
  )
}

export default OrdersGrid