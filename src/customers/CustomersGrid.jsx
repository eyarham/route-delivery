import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Spinner from '../_utils/Spinner';
import { renderTimeCell } from '../_utils/_utils';
import Customer from './Customer';

const CustomersGrid = ({ customers, onDelete, onCreateClick }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const customerRows = customers.map(c => {
      const data = c.data();
      data.id = c.id;
      return data
    });
    setRows(customerRows);
  }, [customers]);

  const [selectedRow, setSelectedRow] = useState();
  const onViewButtonClick = e => {
    setSelectedRow(e);
  }
  const onViewClose = () => {
    setSelectedRow();
  }
  const renderViewCell = e => {
    return <Button onClick={() => onViewButtonClick(e.row)}>View</Button>
  }
  const onDeleteClick = row => {
    //show popup
    onDelete(row.id)
  }

  const renderDeleteCell = e => {
    return <Button onClick={() => onDeleteClick(e.row)}>X</Button>
  }

  const renderActionCell = e => {
    return <Button onClick={() => onCreateClick(e.row)}>create</Button>
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 140 },
    { field: 'address', headerName: 'Address', width: 140 },
    { field: 'createdDate', headerName: 'Customer Since', width: 140, renderCell: renderTimeCell },
    { field: 'view', renderCell: renderViewCell },
    { field: 'create order', renderCell: renderActionCell },
    { field: 'delete', renderCell: renderDeleteCell },
  ];

  if (selectedRow) return <div>
    <Button onClick={onViewClose}>Back</Button>
    <Customer customer={selectedRow} />
  </div>
  if (!customers) return <Spinner />
  return (
    <DataGrid sx={{ minHeight: 400 }}
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  )
}

export default CustomersGrid