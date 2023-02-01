import React, { useContext, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { SnackContext } from '../Context/Snackbar';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('CAB-201', 159, 6, 24, 800),
  createData('CAB-202', 237, 9, 37, 1000),
  createData('CAB-203', 262, 16, 24, 1200),
  createData('MXB-100', 305, 3, 67, 800),
  createData('MXB-101', 356, 16, 49, 800),
];



export const Homepage = () => {
  const {token1,admin1,superadmin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [Super,setSuper] = superadmin1
  const navigate = useNavigate();
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity] = snackseverity1


  return (
    <TableContainer component={Paper} sx={{marginTop:5, width:"80%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>课程ID</TableCell>
            <TableCell align="right">报课学生</TableCell>
            <TableCell align="right">本月新增学生</TableCell>
            <TableCell align="right">本月新增体验学生</TableCell>
            <TableCell align="right">报价</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
