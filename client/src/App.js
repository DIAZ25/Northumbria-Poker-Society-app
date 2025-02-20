import React from 'react';
import Auth from './components/Auth/Auth';
import Register from './components/Register/Register';
import Newsfeed from './pages/Newsfeed/Newsfeed';
import Profile from './pages/Profile/Profile';
import Calendar from './components/Calendar/Calendar';
import Navbar from './components/Navbar/Navbar';

import './app.css'
import {
    Routes,
    Route,
  } from "react-router-dom";

import PersistLogin from './components/Auth/persistLogin';
import RequireAuth from  "./context/Auth/RequireAuth";
import NewsfeedAdmin from './pages/Newsfeed/NewsfeedAdmin';
import Unauthorized from './pages/Unauthorized';
import PokerPractice from './pages/PokerPractice/PokerPractice';
import Admin from './pages/Admin/Admin';
import Chat from './pages/Chat/Chat';
import ContextWrapper from './components/Calendar/ContextWrapper';
import Chatbot from './components/Chatbot/Chatbot';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const App = () => {




    return (
      <> 
         <Routes>
           
        <Route path="/" element={<Auth />}/>
        <Route path="sign-up" element={<Register />}/>
        <Route path="unauthorized" element={<Unauthorized />}/>
        
        <Route element={<PersistLogin/>}> 
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
         
        <Route path="newsfeed"  element={
          <>
          <Newsfeed /> 
        
          </>}/>

        <Route path="calendar"  element={
          <ContextWrapper>
            <Navbar/>
            <Calendar />
          </ContextWrapper>
          }/>
         
        <Route path="profile"  element={
         <Profile /> }/>
          <Route path="pokerpractice"  element={
         <PokerPractice /> }/>
          <Route path="chat"  element={
          <Chat/>}/>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="newsfeedadmin"  element={
          <NewsfeedAdmin />}/>
          <Route path="admin"  element={
          <Admin />}/>
          </Route>
          
      </Route>
      </Route>
      
         </Routes>
       <Chatbot/>
           </>
    )
    };
 

export default App;