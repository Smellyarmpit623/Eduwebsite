import React, { Fragment, useContext, useEffect, useState } from 'react'
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from '@mui/joy/styles';
import { FeedContext } from '../Context/FeedContext';
import { SnackContext } from '../Context/Snackbar';
import { UserContext } from '../Context/UserContext';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import Draggable from 'react-draggable';
import SearchIcon from '@mui/icons-material/Search';


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
  

export const ChooseWordDialog = (props) => {

    const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
    const [GBsnack,setGBsnack]=GBsnack1
    const {token1,admin1}=useContext(UserContext)
    const [token,settoken]=token1
    const [snackmsg,setsnackmsg]=snackmsg1
    const [snackseverity,setsnackseverity]=snackseverity1
    const {mdCID1,mdItemName1,md1,entry1} = useContext(FeedContext)
    const [mdCID,setmdCID]=mdCID1
    const [md,setmd] = md1
    const [mdItemName,setmdItemName]=mdItemName1
    const [entry,setentry]=entry1
    const [choose,setchoose,word,setword]=props.value


    const handlesearch= async()=>{
        const requestoptions={
            method:"GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            
          }
          const response = await fetch("http://120.79.159.198:5000/Course/GetT/"+word,requestoptions)
          if(!response.ok)
          {
            setsnackmsg("获取词条内容时出现未知错误")
            setsnackseverity("warning")
            setGBsnack(true);
            setmd("")
          }
          else{
            if(response.status===200)
            {
              response.json().then((value)=>{
                setmdItemName("")
                setmd(value)
                setchoose(false)
                setentry(true)
                
                if(value==="")
                {
                    setsnackmsg("词条为空，可能是词条名字不正确，或者词条第一次被编辑 ")
                    setsnackseverity("info")
                    setGBsnack(true);
                }
                else
                {
                    setsnackmsg("词条获取成功 😊")
                    setsnackseverity("success")
                    setGBsnack(true);
                }
              })
              
              
              
            }
          }
    }

  return (
    <Dialog
      open={choose}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={()=>{
        setchoose(false)
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >

      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        选择词条
      </DialogTitle>
      <DialogContent>
        
      <DialogContentText>
        <Typography>请输入完整的词条名字</Typography>
        <Typography>如果名词之前没有被引用过会创建一个空的词条</Typography>
        
        
      </DialogContentText>
        <TextField label="名词" variant="outlined" value={word} onChange={(e)=>setword(e.target.value)} sx={{marginTop:2}} />
      </DialogContent>
      <DialogActions>
      <Fab color="default" onClick={handlesearch} aria-label="edit" variant='extended' sx={{
        margin:"4px" 
      }}>
        <SearchIcon sx={{mr:1}}/>
        查找
      </Fab>
      </DialogActions>
    </Dialog>
  )
}
