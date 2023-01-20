import { Popover, Typography } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Code from './CodeBlock';
import { YTPlayer } from './YoutubePlayer';
import { LatexComponent } from './Latex';
import Markdown from "markdown-to-jsx"
import { UserContext } from '../Context/UserContext';
import { SnackContext } from '../Context/Snackbar';


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


const Terminology = ({children}) => {
    
    const [ShowDefin,SetShowDefin]=useState(false)
    const {token1,admin1}=useContext(UserContext)
    const [token,settoken]=token1
    const [md,setmd] = useState(``)
    const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
    const [GBsnack,setGBsnack]=GBsnack1
    const [snackmsg,setsnackmsg]=snackmsg1
    const [snackseverity,setsnackseverity]=snackseverity1

    useEffect(() => {
        const updatemd=async()=>{
          if(children!=="" && children!==undefined)
          {
            const requestoptions={
              method:"GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              
            }
            const response = await fetch("http://127.0.0.1:8000/Course/GetT/"+children,requestoptions)
            if(!response.ok)
            {
              if(response.status===403)
              {
                setsnackmsg("你已经被封禁!!请联系管理员 😢")
                setsnackseverity("error")
                setGBsnack(true);
              }
              if(response.status===404)
              {
                setsnackmsg(response.detail)
                setsnackseverity("error")
                setGBsnack(true);
              }
              if(response.status===401)
              {
                setsnackmsg("你还没有登录噢 😒")
                setsnackseverity("info")
                setGBsnack(true);
              }
              setmd("")
            }
            else{
              if(response.status===200)
              {
                response.json().then((value)=>{
                  setmd(value)
                })
                
                
                
              }
            }
          }
        }
        updatemd()
    
      },[]);

    const HandleOpen=()=>{
        SetShowDefin(true);
    };

    const HandleClose=()=>{
        SetShowDefin(false);
    };
    
    return (
    <Fragment>
        <i>
            <b style={{
                backgroundColor:"#3e3f40",
                borderRadius:"7px",
                color:"#91caf9"
            }}>
                <a onClick={HandleOpen}>{children}</a>
                <Dialog
                open={ShowDefin}
                fullWidth={true}
                maxWidth={'md'}
                onClose={HandleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {children}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    <Markdown 
                        options={{
                            overrides: {
                            Code: {
                                component: Code
                            },
                            YTPlayer: {
                                component: YTPlayer
                            },
                            Latex:{
                                component: LatexComponent
                            },
                            Pedia:{
                                component: Terminology
                            }
                            }
                        }}>
                            {md}
                    </Markdown>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                </DialogActions>
                </Dialog>
            </b>
            
        </i>

        
    </Fragment>
    )
}

export default Terminology