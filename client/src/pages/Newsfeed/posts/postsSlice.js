import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../api/axios'

/**
 * 
 * Calls all the data used in the other components.
 * 
 * Directly sends data to the mongodb and
 * fetches it.
 * 
 * 
 * @author Scott Mains
 * 
 */

const POST_URL = '/api/newsfeed/postnewsfeed';
const GET_URL = '/api/newsfeed/getnewsfeed';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(GET_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POST_URL, initialPost)
        return response.data
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            thumbsDown:0,
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
           
                const loadedPosts = action.payload.map(post => {
                    post.reactions = {
                        thumbsUp: 0,
                        thumbsDown: 0
                    }
                    return post;
                });

                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer