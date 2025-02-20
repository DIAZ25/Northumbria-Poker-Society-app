
import Navbar from "../../components/Navbar/Navbar";
import React, { useState } from 'react';
import axios from '../../api/axios'
import { useEffect} from "react";
import UsersExcerpt from "./UsersExcerpt";

/**
 * 
 * Admin Dashboard Page.
 * 
 * This calls the getAllUsers api link which
 * grabs the users name, wins and losses.
 * 
 * It passes this information to its child component
 * UserExcerpts.
 * 
 * 
 * @author Scott Mains
 * 
 */
const Admin = () => {

  const [allUsers, setAllUsers] = useState([])

  const getAllUsers =  () => {
    axios.get('/api/admin/getAllUsers')
    .then(resp => {
    setAllUsers(resp.data)
    });
  }

useEffect(() => {
  const fetchData = async() => await getAllUsers();
  fetchData();
 
}, [])



let content; 

content = allUsers.map(user => <UsersExcerpt key={user._id} user={user} />)

  return (
   <>
   <div className="min-h-screen">
   <Navbar/> 
 
   <div className="relative md:pt-16 md:pb-32 flex content-center items-center justify-center ">
    <div className="bg-landing-background bg-cover bg-center absolute  top-0 w-full h-3/6 md:h-4/5   " />
    <div className="container relative mx-auto ">
        <div className="pb-44 md:pb-10 ">
          <div className="mt-3  "> 
                <h1 className="md:text-6xl text-3xl tracking-widest text-white pt-10 ">Admin Dashboard</h1> </div>
                </div>    
    </div>
    </div>

    <h3 className="text-black text-xl pb-5 "> Welcome to the admin dashboard. Here you can set the wins and losses of those within the society. </h3>

    <h3 className="text-black text-xl pb-5 "> Make sure to refresh to see any changes made. </h3>
   {content}

   
    </div>
   </>
  )
}

export default Admin