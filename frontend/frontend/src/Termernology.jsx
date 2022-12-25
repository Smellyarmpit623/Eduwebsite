import { Popover, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import nigga from './nigga.txt'
import Code from './CodeBlock';
import { YTPlayer } from './YoutubePlayer';
import { LatexComponent } from './Latex';
import Markdown from "markdown-to-jsx"


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


const Termernology = ({children}) => {
    
    const [ShowDefin,SetShowDefin]=useState(false)
    const [md,setmd] = useState(``)

    const HandleOpen=()=>{
        SetShowDefin(true);
        fetch(nigga)
        .then(r => r.text())
        .then(text => {
        setmd(text)
        });
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
                                component: Termernology
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

export default Termernology