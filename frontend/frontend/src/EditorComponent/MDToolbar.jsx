import React, { useContext } from 'react'
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from '@mui/joy/styles';
import { FeedContext } from '../Context/FeedContext';
import { SnackContext } from '../Context/Snackbar';
import { UserContext } from '../Context/UserContext';
import { Box, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';



export const MDToolbar = () => {
    const {mdCID1,mdItemName1,md1} = useContext(FeedContext)
    const {token1,admin1}=useContext(UserContext)
    const [token,settoken]=token1
    const [mdCID,setmdCID]=mdCID1
    const [md,setmd] = md1
    const [mdItemName,setmdItemName]=mdItemName1
    const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
    const [GBsnack,setGBsnack]=GBsnack1
    const [snackmsg,setsnackmsg]=snackmsg1
    const [snackseverity,setsnackseverity]=snackseverity1
  return (
    <Box>
        <Fab color="secondary" aria-label="edit" variant='extended' sx={{
        margin:"8px"
      }}>
        <PublishIcon sx={{mr:1}}/>
        上传
      </Fab>
    </Box>
  )
}
