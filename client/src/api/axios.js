import axios from 'axios';

// SETS THE API LINK PATH ACROSS THE WHOLE APPLICATION
const BASE_URL = 'http://localhost:5000/';

export default axios.create({
    baseURL: BASE_URL
});

//USES THE LINK PATH ACROSS AXIOS REQUESTS
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});