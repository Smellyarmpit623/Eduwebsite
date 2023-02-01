import { Box, createTheme, CssBaseline, Fab, Grid, ThemeProvider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { BackendContext } from './Context/BackendContext';
import { SnackContext } from './Context/Snackbar'
import { UserContext } from './Context/UserContext';
import { GlobalSnackbar } from './Snackbar'
import HomeIcon from '@mui/icons-material/Home';

import Navbar from './Navbar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export const Admin = () => {
  const [adminlogin,setadminlogin]=useState(true)
  const [User_ID,setUser_ID]=useState("")
  const [Password,setPassword]=useState("") 
  const [notiopen,setnotiopen]=useState(false)
  const [ErrorMsg,setErrorMsg]=useState("")
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity] = snackseverity1
  const [notiftype,setnotifytype]=useState("")
  const [add,setadd]=useContext(BackendContext)
  const {token1,admin1,superadmin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [Super,setSuper] = superadmin1
  const navigate = useNavigate();

  

  return (
    <>

      <GlobalSnackbar/>
      <ThemeProvider theme={darkTheme}>
      
      <CssBaseline />
      <Navbar/>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
              <Box>

              <Fab color="error" onClick={()=>{navigate('/Admin/Tool/Home/')}} aria-label="edit" variant='extended' sx={{
                margin:"8px" 
              }}>
                  <HomeIcon sx={{mr:1}}/>
                  后台总览
              </Fab>

              <Fab color="info" onClick={()=>{navigate('/Admin/Tool/Add/')}} aria-label="edit" variant='extended' sx={{
                margin:"8px" 
              }}>
                  <ManageAccountsIcon sx={{mr:1}}/>
                  课程管理
              </Fab>

              </Box>
          </Grid>

          <Grid item xs={10}>
            <div className='content'>
              <Outlet>
                  
              </Outlet>
            </div>
          </Grid>

        </Grid>
      </Box>
      </ThemeProvider>
    </>
  )
}
