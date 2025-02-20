import ReactionButtons from "./ReactionButtons";

/**
 * 
 * Child component of Post list
 * which takes the data called
 * and displays it.
 * 
 * @author Scott Mains
 * 
 */
const PostsExcerpt = ({ post }) => {


    const date = JSON.stringify(post.date);
 


    return (
        <article className="mx-auto p-6 mt-4 sm:w-1/3 rounded-lg border text-white border-green-200 shadow-md bg-green-800 ">
            <h3 className="font-mono text-4xl">{post.title}</h3>
            <p className="font-mono text-lg pt-10 ">{post.body}</p>
            <p className="pt-10 "> 
                Written by Head of Society   </p>
                <ReactionButtons post={post} />
                <p className="font-mono italic text-md pt-5">This was posted {post.date.replace(/['"]+/g, '')}</p>
               
         
            <div className="text-right">
         
            </div>
        </article>
    )
}
export default PostsExcerpt