import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const CustomersGrid = () => {
  const renderTimeCell = e => {
    const dateTime = e.value;
    const returnString = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}, ${getTwoDigit(dateTime.getHours())}:${getTwoDigit(dateTime.getMinutes())}`;
    return returnString;
  }

  const getTwoDigit = num => {
    if (num > 9) return num
    else return `0${num}`
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First Name', width: 140 },
    { field: 'lastName', headerName: 'Last Name', width: 140 },
    { field: 'timeReady', headerName: 'Time Ready', width: 140, renderCell: renderTimeCell },
    
  ];

  const rows = [
    { id: 1, firstName: 'Fern', lastName: 'Boolin', timeReady: new Date("2/27/2023 06:00:00") },

  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <h4>Customers</h4>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default CustomersGrid