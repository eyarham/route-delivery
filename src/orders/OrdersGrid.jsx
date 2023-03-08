import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import NewRoute from '../routes/NewRoute';
import { renderTimeCell } from '../_utils/_utils';
import Order from './Order';



const OrdersGrid = ({ orders, readonly, onDelete }) => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedOrders, setSelectedOrders] = useState();
  const [showNewRoute, setShowNewDelivery] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const ordersRows = orders.map(o => {

      const data = (o && o.data && o.data()) || o;
      data.id = o.id;
      data.name = data.customer && data.customer.name;
      data.address = data.customer && data.customer.address;
      return data;
    })
    setRows(ordersRows)
  }, [orders]);


  const renderActionCell = e => {
    return <Button onClick={() => onViewButtonClick(e.row)}>View</Button>
  }
  const onDeleteClick = row => {
    //show popup
    onDelete(row.id)
  }
  const renderDeleteCell = e => {
    return <Button onClick={() => onDeleteClick(e.row)}>cancel</Button>
  }

  const columns = [
    { field: 'readyTime', headerName: 'Time Ready', width: 140, renderCell: renderTimeCell },
    { field: 'status', headerName: 'status', width: 140 },
    { field: 'name', headerName: 'name', width: 140 },
    { field: 'address', headerName: 'address', width: 140 },    
    { field: '', renderCell: renderActionCell },
    { field: 'cancel', renderCell: renderDeleteCell },
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
  const closeNewRoute = () => {
    setShowNewDelivery(false);
  }
  if (selectedOrder) return (<div style={{ height: 400, width: '100%' }}><Order order={selectedOrder} close={closeOrder} /></div>)
  if (showNewRoute) return (<div style={{ height: 400, width: '100%' }}><NewRoute orders={selectedOrders} close={closeNewRoute} /></div>)
  return (
    <Box sx={{ height: 400 }}>
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
    </Box>
  )
}

export default OrdersGrid