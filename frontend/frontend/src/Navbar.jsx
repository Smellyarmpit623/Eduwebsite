import React, { useContext } from 'react'
import { Box, Container, Typography,Stack, AppBar, Toolbar, styled, InputBase, Badge, Avatar, Menu, MenuItem} from '@mui/material';
import { Mail , Notifications, Token} from '@mui/icons-material';
import { useState } from 'react';
import { UserContext } from './Context/UserContext';
import LoginForm from './LoginRegisterForm';
import { SnackContext } from './Context/Snackbar';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display:"flex",
  justifyContent:"space-between",

})

const SearchBar = styled("div")(({theme})=>({
  backgroundColor:"black",
  padding:"0 10px",
  borderRadius: theme.shape.borderRadius,
  width:"40%",
}))

const IconsContainer = styled(Box)(({theme})=>({
  display:"flex",
  gap:"20px",
  alignItems:"center",
}))

const UserIconsContainer = styled(Box)(({theme})=>({
  display:"flex",
  gap:"10px",
  alignItems:"center",

}))



const Navbar = () => {
  const [UserMenu, setUserMenu] = useState(false)
  const {token1,admin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [Admin,setAdmin]=admin1
  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity]=snackseverity1
  const Logout=()=>{
    settoken(null)
    localStorage.setItem("Token",null)
    setAdmin(false)
    setUserMenu(false)
    setsnackmsg("成功登出")
    setsnackseverity("success")
    setGBsnack(true);
  }
  return (
    <AppBar position='sticky'> 
      <StyledToolbar> 
        <Typography variant='h6'> XX Academy </Typography>
        <SearchBar> <InputBase placeholder='Search'></InputBase> </SearchBar>


        <IconsContainer> 
          <Badge badgeContent={!token? (0):(10)} color="warning">
            <Mail/>
          </Badge>

          <Badge badgeContent={!token? (0):(2)} color="warning">
            <Notifications/>
          </Badge>
          {!token? (<LoginForm/>):(<Avatar src='https://images.indianexpress.com/2022/10/cat-1200.jpg' onClick={e=>setUserMenu(true)} sx={{
            width:42,
            height:42,
          }}
          ></Avatar>)}

          

        </IconsContainer>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={UserMenu}
        onClose={e=>setUserMenu(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={Logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar