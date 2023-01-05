import { Box, Button, IconButton } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import TerminalIcon from '@mui/icons-material/Terminal';
import React, { useEffect } from 'react'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CalculateIcon from '@mui/icons-material/Calculate';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Sidebar = () => {
  useEffect(()=>{
    //axios.get
  }
  ,[])
  const [open, setOpen] = React.useState(true);
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          课程
          <IconButton sx={{left:"80%"}}><AddBoxIcon/></IconButton>
        </ListSubheader>
        
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <PrecisionManufacturingIcon />
        </ListItemIcon>
        <ListItemText primary="CAB-202" secondary="Micro-Controller"/>
      </ListItemButton>
      
      {/* */}
      <ListItemButton>
        <ListItemIcon>
          <TerminalIcon />
        </ListItemIcon>
        <ListItemText primary="CAB-201" secondary="Programming Principle"/>
      </ListItemButton>

      <ListItemButton onClick={()=>setOpen(!open)}>
        <ListItemIcon>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="MXB-100" secondary="Introducory Calculus"/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PlayLessonIcon />
            </ListItemIcon>
            <ListItemText primary="Week 0 Introducing Rate Of Change"/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}

export default Sidebar