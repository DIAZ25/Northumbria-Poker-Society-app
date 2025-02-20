import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/Auth/AuthProvider';
import { newsfeed } from './pages/Newsfeed/app/newsfeed';
import { Provider } from 'react-redux';




ReactDom.render(

<React.StrictMode> 
    <BrowserRouter>
    <Provider store={newsfeed}>
  <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
  </AuthProvider>
  </Provider>
    </BrowserRouter>
</React.StrictMode>, 
document.getElementById('root')

);

