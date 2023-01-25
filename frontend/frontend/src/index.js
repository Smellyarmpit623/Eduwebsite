import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import { Admin } from './Admin';
import App from './App';
import { BackendContext, BackendContextProvider } from './Context/BackendContext';
import { FeedContextProvider } from './Context/FeedContext';
import { SnackbarContextProvider } from './Context/Snackbar';
import { UserContextProvider } from './Context/UserContext';
import MDEditor from './MDEditor';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BackendContextProvider>
    <SnackbarContextProvider>
    <UserContextProvider>
    <FeedContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/index" element={<App />}/>
      <Route path="/" element={<App />}/>
      <Route path="/Admin"element={<Admin />}/>
      <Route path="/editor/:CID/:ItemName"element={<MDEditor />}/>
    </Routes>
    
    </BrowserRouter>
    </FeedContextProvider>
    </UserContextProvider>
    </SnackbarContextProvider>
    </BackendContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

