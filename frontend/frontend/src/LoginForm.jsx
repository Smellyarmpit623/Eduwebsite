import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import Draggable from 'react-draggable';
import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const LoginForm = () => {
  const [LoginWindow,setLoginWindow]=useState(false)
  const [User_ID,setUser_ID]=useState("")
  const [Password,setPassword]=useState("")

  const HandleClose=()=>{
    setLoginWindow(false)
  };

  const HandleOpen=()=>{
    setLoginWindow(true)
  };
  
  const HandleIDchange=(event)=>{
    setUser_ID(event.target.value)
    console.log(User_ID)
  }

  const HandlePasswordchange=(event)=>{
    setPassword(event.target.value)
    console.log(Password)
  }

  return (
    <Fragment>
    <Button onClick={HandleOpen}>
      <Typography variant='span'>登录</Typography>
    </Button>
            <Dialog
                open={LoginWindow}
                fullWidth={true}
                maxWidth={'sm'}
                onClose={HandleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  登录
                </DialogTitle>
                <DialogContent>
                  
                <DialogContentText>
                  需要登录才能看到课程内容哦！
                </DialogContentText>

                  <TextField
                  autoFocus
                  margin="dense"
                  id="outlined-basic"
                  label="用户名 UserName"
                  fullWidth
                  variant="filled"
                  value={User_ID}
                  onChange={HandleIDchange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxSharpIcon />
                      </InputAdornment>
                    ),
                  }}
                  />
                  <TextField
                  autoFocus
                  margin="dense"
                  id="outlined-basic"
                  label="密码 Password"
                  type="password"
                  fullWidth
                  variant="filled"
                  value={Password}
                  onChange={HandlePasswordchange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordSharpIcon />
                      </InputAdornment>
                    ),
                  }}
                  />


                    <Button>123</Button>
                </DialogContent>
                <DialogActions>
                
                </DialogActions>
            </Dialog>
    </Fragment>
    
  )
}

export default LoginForm