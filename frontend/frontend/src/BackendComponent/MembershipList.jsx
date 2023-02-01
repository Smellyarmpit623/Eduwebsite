import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackendContext } from '../Context/BackendContext'
import { SnackContext } from '../Context/Snackbar'
import { UserContext } from '../Context/UserContext'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system'
import { Autocomplete, Divider, Fab, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'



const columns=[{ field: 'CourseID',headerName: '课程名字', width: 150 }, 
                { field: 'User_ID', headerName: '学生用户名', width: 150,}, 
                { field: 'DateExpire',headerName: '到期日期', width: 300,}]


export const MembershipList = () => {

  const [data,setdata]=useState([])
  const [adminlogin,setadminlogin]=useState(true)

  const {GBsnack1,snackmsg1,snackseverity1} = useContext(SnackContext)
  const [GBsnack,setGBsnack]=GBsnack1
  const [snackmsg,setsnackmsg]=snackmsg1
  const [snackseverity,setsnackseverity] = snackseverity1
  const [notiftype,setnotifytype]=useState("")
  const [add,setadd]=useContext(BackendContext)
  const {token1,admin1,superadmin1}=useContext(UserContext)
  const [token,settoken]=token1
  const [Super,setSuper] = superadmin1
  const navigate = useNavigate();
  const [CID,setCID] = useState("CAB-202")
  const [User_ID,setUser_ID]=useState("")
  const [user_list,setuser_list]=useState([{}])
  const [list,setlist]=useState([{}])
  const [time,settime]=useState("")


  const handle_update=async()=>{
    const requestoption={
      method:"PUT",
      url: add+"/SuperAdmin/Membership_Update/",
      headers: {
        "Accept":"application/json",
        Authorization: "Bearer " + token,
      },
      data:{
        CourseID:CID,
        User_ID:User_ID,
        Time:time
      }
    }
    await axios.request(requestoption)
    .then(function(response){ 

      setsnackmsg("操作成功 😊")
      setsnackseverity("success")
      setGBsnack(true);
      navigate(0)

    })
    .catch(function(error){
      if(error.response.status===403)
      {
        setsnackmsg("权限不足")
        setsnackseverity("warning")
        setGBsnack(true);
        navigate("/index")
      }
      if(error.response.status===402)
      {
        setsnackmsg("学生不在你的管理下 或 找不到该学生")
        setsnackseverity("error")
        setGBsnack(true);
        navigate("/index")
      }
      if(error.response.status===404)
      {
        setsnackmsg("时间选项不合法")
        setsnackseverity("warning")
        setGBsnack(true);
        navigate("/index")
      }
    })
  }

  useEffect(()=>{ 
    const get_list=async()=>{

      const requestoption={
        method:"GET",
        url: add+"/SuperAdmin/Membership_List/",
        headers: {
          "Accept":"application/json",
          Authorization: "Bearer " + token,
        },
      }
      await axios.request(requestoption)
      .then(function(response){ 
        setdata(response.data)
      })
      .catch(function(error){
        if(error.response.status===403)
        {
          setsnackmsg("权限不足")
          setsnackseverity("warning")
          setGBsnack(true);
          navigate("/index")
        }
      })

  

    }

    async function getuser(){
      const requestoption={
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    
    return await fetch(add+"/SuperAdmin/Student_List/", requestoption)
    .then((response)=>response.json())
    .catch(function(error){
      if(error.response.status===403)
      {
        setsnackmsg("权限不足")
        setsnackseverity("warning")
        setGBsnack(true);
        navigate("/index")
      }
    })
  }

  console.log('i fire once');
  get_list()
  getuser().then((res)=>{
    
    setuser_list(res)
  })
  },[])


 
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Box sx={{m:5, height: 850, width: '80%' }}>
          {data.length===0?(null):(<DataGrid getRowId={(row)=>row.MembershipID} onRowClick={(row)=>{
            setCID(row.row.CourseID)
            setUser_ID(row.row.User_ID)
            console.log(row.row,row.User_ID)
            }} pageSize={20} rowsPerPageOptions={[5,10,20,30]} columns={columns} rows={data} />)}
        </Box>
      </Grid>
      <Grid item xs={4}>

         <Box sx={{ marginTop:5, p:2,border:'2px grey solid', borderRadius:2}}>
          <Box sx={{m:2,p:2}}>
         <FormControl>
          <InputLabel>课程ID</InputLabel>
          <Select
              value={CID}
              label="课程ID"
              size='small'
              fullWidth={true}
              onChange={(e)=>setCID(e.target.value)}
              >
              <MenuItem value={'CAB-202'}>CAB-202</MenuItem>
              <MenuItem value={'CAB-201'}>CAB-201</MenuItem>
              <MenuItem value={'MXB-100'}>MXB-100</MenuItem>
            </Select>
            
            </FormControl>
            <Divider sx={{marginTop:2}} />
            {user_list.length===0?(null):(
            <Autocomplete
              disablePortal
              options={user_list}
              sx={{ width: '50%', marginTop:2 }}
              renderInput={(params) => <TextField value={User_ID} placeholder={User_ID} onChange={(event=>{
                setUser_ID(event.target.value)
                console.log(event.target.value,User_ID)
              })} {...params} label="学生ID" />
              }
            />)
            }
            <Divider sx={{marginTop:2}} />
            <FormControl sx={{width:"70%"}}>
            <InputLabel sx={{marginTop:2}}>课程ID</InputLabel>
              <Select
                value={time}
                label="设置时间"
                sx={{marginTop:2}}
                size='medium'
                fullWidth={true}
                onChange={(e)=>settime(e.target.value)}
                >
                <MenuItem value={'One day'}>课程时间一天 体验课程 😉</MenuItem>
                <MenuItem value={'LifeTime'}>终身课程时间 全款用户 😄</MenuItem>
                <MenuItem value={'Cancel'}>取消课程资格 😓</MenuItem>
              </Select>
              
            </FormControl>
            <Divider sx={{marginTop:2}} />

            <Fab color="primary" onClick={handle_update} aria-label="edit" variant='extended' sx={{
                
                marginTop:3,
                left:"77%"
              }}>
                  
                  更新数据
            </Fab>
            
         </Box>
         </Box>

      </Grid>
    </Grid>
    </>
  )
}
