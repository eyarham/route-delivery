
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/UserContextProvider';
import { getDocsSub, setIsModerator as setIsMod } from './api';
const Users = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    return getDocsSub(setUsers);
  }, [])
  const [isModerator, setIsModerator] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.data().isModerator) { setIsModerator(true) }
  }, [user]);
  if (!isModerator) return (<div>you are not authorized to view this page.</div>)



  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">isModerator</TableCell>
              <TableCell align="right">actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user, i) => {
              const u = user.data();
              const makeMod = async () => {
                await setIsMod(user.id, true)
                alert(`making ${u.displayName} a mod`)
              }
              const revokeMod = async () => {
                await setIsMod(user.id, false)
                alert(`revoking ${u.displayName}'s status as a mod`)
              }
              return (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {u.displayName}
                  </TableCell>
                  <TableCell align="right">{u.isModerator ? "yes" : "no"}</TableCell>
                  {u.isModerator && <TableCell align="right"><Button onClick={revokeMod}>revoke mod</Button></TableCell>}
                  {!u.isModerator && <TableCell align="right"><Button onClick={makeMod}>make mod</Button></TableCell>}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users