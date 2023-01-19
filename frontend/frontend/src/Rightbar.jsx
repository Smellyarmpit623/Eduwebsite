import React, { Fragment, useContext, useState } from 'react'
import { Box, Container, Typography,Stack, Button, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UserContext } from './Context/UserContext';
import { FeedContext } from './Context/FeedContext';
import { SnackContext } from './Context/Snackbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';


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



const Rightbar = () => {
  const {mdCID1,mdItemName1,md1} = useContext(FeedContext)
  const [mdCID,setmdCID]=mdCID1
  const [md,setmd] = md1
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [admin]=admin1
  const [mdItemName,setmdItemName]=mdItemName1
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1
  const navigate = useNavigate();
  const [delete1,setdelete] = useState(false)
  const [suc,setsuc]=useState(false)

  const handledelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body:JSON.stringify({
        "CourseID":mdCID,
        "ItemName":mdItemName,
      })
    }
    fetch("http://120.79.159.198:5000/Course/DeleteItem", requestOptions)
      .then((response)=>response.json())
      .then((response)=>{
        if(response.detail==="Not an Admin")
        {
          setsnackmsg("删除失败，原因：权限不足")
          setsnackseverity("error")
          setGBsnack(true);
          setdelete(false)
        }
        else{
          if(response.Msg==="Item has been deleted")
          {
            setdelete(false)
            setsuc(true)
          }
        }
      })
      
  }

  return (
    <Box>
      {admin && mdCID!=="" && mdItemName!==""?(<Fragment><Fab onClick={()=>navigate(`/editor/${mdCID}/${mdItemName}`)} color="secondary" aria-label="edit" variant='extended' sx={{
        margin:"8px"
      }}>
        <EditIcon sx={{mr:1}}/>
        编辑笔记
      </Fab>
      <Fab color="secondary" onClick={()=>setdelete(true)} aria-label="edit" variant='extended' sx={{
        margin:"8px"
      }}>
        <DeleteForeverIcon sx={{mr:1}}/>
        删除笔记
      </Fab></Fragment>):(null)}


      <Dialog
      open={delete1}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={()=>{
        setdelete(false)
        navigate(0)
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        确认删除
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        <Typography>请确认，一旦删除无法撤回</Typography>
        
      </DialogContentText>
      
      </DialogContent>
      <DialogActions>
        <Button onClick={handledelete} variant='contained'>删除</Button>
      </DialogActions>
    </Dialog>


    <Dialog
      open={suc}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={()=>{
        setsuc(false)
        navigate(0)
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        成功
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        <Typography>{`"`+mdItemName+`"`+" 删除成功"}</Typography>
        
      </DialogContentText>
      
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          setsuc(false)
          navigate(0)
        }} variant='contained'>太好了!</Button>
      </DialogActions>
    </Dialog>

    
    </Box>
  )
}

export default Rightbar