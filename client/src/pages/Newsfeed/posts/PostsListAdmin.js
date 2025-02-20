import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import { useEffect } from "react";
import PostsExcerptAdmin from "./PostsExcerptAdmin";

/**
 * 
 * fetches all the posts called
 * from post slice and maps it 
 * to a child component.
 * 
 * It then displays the data.
 * 
 * Only displayed on admin page as it
 * utilises an admin child component.
 * 
 * @author Scott Mains
 * 
 */

const PostsListAdmin = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        content = posts.map(post => <PostsExcerptAdmin key={post._id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h3 className="text-center font-mono text-4xl pt-10"> ANNOUNCEMENTS </h3>
            {content}
        </section>
    )
}
export default PostsListAdmin