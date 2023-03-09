import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Spinner from '../_utils/Spinner';
import { renderTimeCell } from '../_utils/_utils';

const DriversGrid = ({  drivers, onDelete }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const customerRows = drivers.map(c => {
      const data = c.data();
      data.id = c.id;
      return data
    });
    setRows(customerRows);
  }, [drivers]);

  const onDeleteClick = row => {
    //show popup
    onDelete(row.id)
  }

  const renderDeleteCell = e => {
    return <Button onClick={() => onDeleteClick(e.row)}>X</Button>
  }


  const columns = [
    { field: 'name', headerName: 'Name', width: 140 },
    { field: 'createdDate', headerName: 'Customer Since', width: 140, renderCell: renderTimeCell },
    { field: 'delete', renderCell: renderDeleteCell },
  ];


  if (!drivers) return <Spinner />
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default DriversGrid