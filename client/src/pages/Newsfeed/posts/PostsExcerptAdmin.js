import ReactionButtons from "./ReactionButtons";
import axios from '../../../api/axios'
import { useState} from 'react';

/**
 * 
 * Child component of AdminPostlist
 * which takes the data called
 * and displays it.
 * 
 * Also added functionality to delete
 * the post if they have admin privileges
 * 
 * @author Scott Mains
 * 
 */

const PostsExcerptAdmin = ({ post }) => {

    const [success, setSuccess] =useState("");

    const deletePost = async (id) => {
    
        axios.post('/api/newsfeed/newsfeeddelete', {"_id": post._id})
       .then((res) => {
           console.log('response',res);
           res.success('success delete')
           setSuccess("deleted successfully")
       })
       .catch((error) => {
           console.log('error block called',error);
       })
  
       }

    return (
        <article className="mx-auto p-6 sm:w-1/3 rounded-lg border text-white border-green-200 shadow-md bg-green-800 mt-10">
            <h3 className="font-mono text-4xl">{post.title}</h3>
            <p className="font-mono text-lg pt-5">{post.body.substring(0, 100)}</p>
            <p className="postCredit pt-10">
                Written by Head of Society </p>
                <ReactionButtons post={post} />
                <p className="font-mono italic text-md pt-5">This was posted {post.date}</p>
               
     
            <div className="text-right">
            <button className="text-right text-red-500" onClick={deletePost}> Delete </button>
            </div>
            {success}
        </article>
    )
}
export default PostsExcerptAdmin