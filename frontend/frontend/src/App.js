
import Button from '@mui/material/Button';
import { Settings, Add } from '@mui/icons-material';
import { Box, Container, Typography,Stack, Grid} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Rightbar from './Rightbar';
import Feed from './Feed';
import CssBaseline from '@mui/material/CssBaseline';
import 'katex/dist/katex.min.css'

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box>
      <Navbar/>
      <Grid container spacing={3}>
      <Grid item xs={3}>
        <Sidebar/>
      </Grid>
      <Grid item xs={7}>
        <Feed/>
      </Grid>
      <Grid item xs={2}>
        <Rightbar/>
      </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
  );
}

export default App;
