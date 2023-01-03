import React, { Fragment, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import Draggable from 'react-draggable';
import { Alert, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { SnackContext } from './Context/Snackbar';

export const GlobalSnackbar = () => {
    const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
    const [GBsnack,setGBsnack]=GBsnack1
    const [snackmsg,setsnackmsg]=snackmsg1
    const [snackseverity,setsnackseverity]=snackseverity1
    const handleClose=()=>{
        setGBsnack(false)
    }
  return (
    <Fragment>
    <Snackbar
          open={GBsnack}
          autoHideDuration={5000}
          onClose={handleClose}
      >
        <Alert severity={snackseverity} sx={{ width: '100%', backgroundColor:'inherit',color:"wheat" }}>
          {snackmsg}
        </Alert>
    </Snackbar>
    </Fragment>
  )
}
