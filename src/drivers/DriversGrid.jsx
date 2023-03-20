import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Spinner from '../_utils/Spinner';
import { renderTimeCell } from '../_utils/_utils';
import Driver from './Driver';

const DriversGrid = ({  drivers, onDelete }) => {
  const [rows, setRows] = useState([]);

  const [selectedRow, setSelectedRow] = useState();
  const [selectedId, setSelectedId] = useState();
  const onViewButtonClick = e => {
    setSelectedRow(e.row);
    setSelectedId(e.id);
  }
  const onViewClose = () => {
    setSelectedRow();
  }
  const renderViewCell = e => {
    return <Button onClick={() => onViewButtonClick(e)}>View</Button>
  }
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
    { field: 'email', headerName: 'Email', width: 140 },
    { field: 'createdDate', headerName: 'Driver Since', width: 140, renderCell: renderTimeCell },
    { field: 'view', renderCell: renderViewCell },
    { field: 'delete', renderCell: renderDeleteCell },
  ];

  if (selectedRow) return <div>
    <Button onClick={onViewClose}>Back</Button>
    <Driver driver={selectedRow} id={selectedId}  />
  </div>
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