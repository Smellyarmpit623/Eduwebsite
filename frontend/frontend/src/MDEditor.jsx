import { Box, Container, Typography,Stack, Grid} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import 'katex/dist/katex.min.css'
import { UserContextProvider } from './Context/UserContext';
import { SnackbarContextProvider, SnackContext } from './Context/Snackbar';
import { GlobalSnackbar } from './Snackbar';
import { FeedContext, FeedContextProvider } from './Context/FeedContext';
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from '@mui/joy/styles';
import Feed from './Feed';
import { useContext, useEffect } from 'react';
import { ETextarea } from './EditorComponent/Etextarea';
import { useParams } from 'react-router-dom';
import { MDToolbar } from './EditorComponent/MDToolbar';


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MDEditor() {
    const para=useParams()
    const {ItemName,CID}=para

  return (
    
    <>
    <GlobalSnackbar/>
    <ThemeProvider theme={darkTheme}>
      
    <CssBaseline />
    <Box>
      <Navbar/>
      <Grid container spacing={2}>
      <Grid item xs={2}>
        <MDToolbar/>
      </Grid>
      <Grid item xs={4}>
            <ETextarea cid={CID} itn={ItemName}/>
      </Grid>
      <Grid item xs={6}>
      <Box sx={{
        border: '2px solid white',
        borderRadius:"10px",
        p:2,
      }}>
          <Feed/>
          </Box>
      </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
    </>
    
  );
}

export default MDEditor;
  