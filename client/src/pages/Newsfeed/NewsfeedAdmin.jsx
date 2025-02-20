import PostsListAdmin from "./posts/PostsListAdmin";
import AddPostForm from "./posts/AddPostForm";
import Navbar from "../../components/Navbar/Navbar"
import React from 'react'

/**
 * 
 * Contains all the components and html/css 
 * displayed on the Newsfeed page.
 * 
 * Overall parent component.
 * 
 * Only displayed for admin as it includes
 * the addpostform component which should
 * only be accessible to admins.
 * 
 * @author Scott Mains
 * 
 */

const NewsfeedAdmin = () => {
  return (
   <>
   <Navbar/>
   <AddPostForm />
    <PostsListAdmin />
   
 </>
  )
}

export default NewsfeedAdmin