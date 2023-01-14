import React, { Fragment, useContext, useState } from 'react'
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
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { UserContext } from './Context/UserContext';
import { SnackContext } from './Context/Snackbar';


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

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const LoginForm = () => {
  const [LoginWindow,setLoginWindow]=useState(false)
  const [User_ID,setUser_ID]=useState("")
  const [Password,setPassword]=useState("")
  const [ErrorMsg,setErrorMsg]=useState("")
  const [notiopen, setnotiopen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [notiftype,setnotifytype]= useState("")
  const [reg,setreg]=useState(false)
  const [RegUser_ID,setRegUserID]=useState("")
  const [RegPassword,setRegPassword]=useState("")
  const [ConfirmPassword,setConfirmPassword]=useState("")
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1

  const handleLogin = async() => {
    //
    if(Password.length>=6 && User_ID.length>0)
    {
      const requestoption={
        method:"POST",
        url:"http://120.79.159.198:5000/User/Login/",
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          username:User_ID,
          password:Password
        }
      }
      await axios.request(requestoption)
      .then(function(response){
        settoken(response.data.access_token)
        setsnackmsg("已登录")
        setsnackseverity("success")
        setGBsnack(true);

      })
      .catch(function(error){
        if (error.response) {
          if(error.response.data.detail==="Invalid Credentials" || error.response.status===401)
          {
            setErrorMsg("密码或用户名错误")
            setnotifytype("error")
            setnotiopen(true);
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })

      setnotiopen(true);
    }
    else{
      if(User_ID.length===0)
      {
        setErrorMsg("用户名不能为空")
        setnotifytype("warning")
        setnotiopen(true);
      }
      else{
        setErrorMsg("请确保密码在6位以上")
        setnotifytype("warning")
        setnotiopen(true);
      }
    }
    
  };

  const handleRegisterClick = async() => {
    if(RegPassword.length>=6 && RegUser_ID.length>0 && RegPassword===ConfirmPassword)
    {
      const requestoption={
        method:"POST",
        url:"http://120.79.159.198:5000/User/Register/",
        headers: {
          "Accept":"application/json",
          "Content-Type": "application/json"
        },
        data:{
          User_ID:RegUser_ID,
          Password:RegPassword
        }
      }
      axios.request(requestoption)
      .then(function(response){
        settoken(response.data.access_token)
        setsnackmsg("已登录")
        setsnackseverity("success")
        setGBsnack(true);

      })
      .catch(function(error){
        if (error.response) {
          if(error.response.data.detail==="User name already in use" || error.response.status===400)
          {
            setErrorMsg("用户已经存在")
            setnotifytype("error")
            setnotiopen(true);
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
      
    }
    else{
      if(User_ID.length===0)
      {
        setErrorMsg("用户名不能为空")
        setnotifytype("warning")
        setnotiopen(true);
      }
      else{
        if(RegPassword!=ConfirmPassword)
        {
          setErrorMsg("两次密码不相同")
          setnotifytype("warning")
          setnotiopen(true);
        }
        else
        {
          setErrorMsg("请确保密码在6位以上")
          setnotifytype("warning")
          setnotiopen(true);
        }
      }
    }
    
  };

  const notihandleClose = () => {
    setnotiopen(false);
  };
  const HandleClose=()=>{
    setLoginWindow(false)
  };

  const HandleOpen=()=>{
    setLoginWindow(true)
  };
  
  const HandleIDchange=(event)=>{
    setUser_ID(event.target.value)
  }

  const HandlePasswordchange=(event)=>{
    setPassword(event.target.value)
  }

  const handleregIDchange=(event)=>{
    setRegUserID(event.target.value)
  }

  const handleregPasschange=(event)=>{
    setRegPassword(event.target.value)
  }

  const handleregconchange=(event)=>{
    setConfirmPassword(event.target.value)
  }

  const handleregister=()=>{
    HandleClose()
    setreg(true)
  }
  
  const regclose=()=>{
    setreg(false)
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
                  />

                  <Snackbar
                      open={notiopen}
                      autoHideDuration={3500}
                      onClose={notihandleClose}
                      
                  >
                    <Alert severity={notiftype} sx={{ width: '100%',backgroundColor:"inherit" }}>
                      {ErrorMsg}
                    </Alert>
                  </Snackbar>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleregister}> 注册</Button>
                  <Button onClick={
                    handleLogin
                  }> 登陆 </Button>
                  
                </DialogActions>
            </Dialog>

            <Dialog
                open={reg}
                fullWidth={true}
                maxWidth={'sm'}
                onClose={regclose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  注册
                </DialogTitle>
                <DialogContent>
                  
                <DialogContentText>
                  
                </DialogContentText>

                  <TextField
                  autoFocus
                  margin="dense"
                  id="outlined-basic"
                  label="用户名 UserName"
                  fullWidth
                  variant="filled"
                  helperText="使用邮箱最好记哦"
                  value={RegUser_ID}
                  onChange={handleregIDchange}
                  />

                  <TextField
                  autoFocus
                  margin="dense"
                  id="outlined-basic"
                  label="密码 Password"
                  type="password"
                  helperText="想个最难的密码 长度>=6"
                  fullWidth
                  variant="filled"
                  value={RegPassword}
                  onChange={handleregPasschange}
                  />

                  <TextField
                  autoFocus
                  margin="dense"
                  id="outlined-basic"
                  label="确认密码 Confirm Password"
                  type="password"
                  helperText="再输入一次"
                  fullWidth
                  variant="filled"
                  value={ConfirmPassword}
                  onChange={handleregconchange}
                  />

                  <Snackbar
                      open={notiopen}
                      autoHideDuration={3500}
                      onClose={notihandleClose}
                      
                  >
                    <Alert severity={notiftype} sx={{ width: '100%',backgroundColor:"inherit" }}>
                      {ErrorMsg}
                    </Alert>
                  </Snackbar>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={handleRegisterClick}> 注册</Button>
                </DialogActions>
            </Dialog>
    </Fragment>
    
  )
}

export default LoginForm