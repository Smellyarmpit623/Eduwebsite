import { Fragment, useContext, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Button } from '@mui/material';
import { Box } from '@mui/system';



const Code = ({ children, language }) => {
  const [copied, setCopied] = useState(false);


  const [Copiednotif, setCopiednotif] = useState(false);

  const handleClick = () => {
    setCopiednotif(true);
  };

  const handleClose = () => {
    setCopiednotif(false);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [copied])


  return (
    <div className="codeblocks" style={{
      position: "relative"
    }}>
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <IconButton onClick={handleClick} style={{
          position: "absolute",
          top: "1rem",
          right: "22%",
          zIndex: "5"
        }}>
          {copied ? <ContentPasteIcon /> : <ContentCopyIcon />}
        </IconButton>

        

      </CopyToClipboard>

      <Snackbar
          open={Copiednotif}
          autoHideDuration={3500}
          onClose={handleClose}
          message="Code Copied"
      >
        <Alert severity="success" sx={{ width: '100%',backgroundColor:"inherit" }}>
          代码复制成功
        </Alert>
      </Snackbar>
      <Box sx={{width:"80%"}}>
      <SyntaxHighlighter
        
        language={language}
        style={materialDark}
      >

        {children}
        
      </SyntaxHighlighter>
      </Box>
    </div>
  )
}

export default Code