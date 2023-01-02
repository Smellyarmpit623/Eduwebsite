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
    const [GBsnack,setGBsnack]=useContext(SnackContext)
    const [snackmsg,setsnackmsg]=useContext(SnackContext)
    const [snackseverity,setsnackseverity]=useContext(SnackContext)
    const handleClose=()=>{
        setGBsnack(false)
    }
  return (
    <Fragment>
    <Snackbar
          open={GBsnack}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Code Copied"
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {snackmsg}
        </Alert>
    </Snackbar>
    </Fragment>
  )
}
