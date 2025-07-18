//axios for making API requests 
import axios from 'axios';
import { API_BASE_URL } from './apiPaths';

// Create an axios instance with the base URL and default headers
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout ..if the request/res takes longer than this, it will be aborted 
  headers: {
    'Content-Type': 'application/json', //indicates that the request body format is JSON
    'Accept': 'application/json', //indicates that the response format expected is JSON
  },
});

// Add a request interceptor to include the token in headers
// Before sending the API call, add a JWT token to the Authorization header — if it exists.
axiosInstance.interceptors.request.use( //txt 129
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Return the modified config object to proceed with the request
  },
  (error) => {
    return Promise.reject(error);
  }
);
// the config object contains the request details, including the URL, method, headers, and data.

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response)=>{
        return response; // Return the response as is if successful
    },
    (error)=>{ //2nd fn is called when an error occurs 
        // Handle errors globally
        if (error.response) {
            if(error.response.status === 401) {
                // Unauthorized access, redirect to login 

                //txt 250
                window.location.href = '/login'; // Redirect to login page
            } else if (error.response.status === 500) {
                // Internal Server Error, display an error message
                console.error('Server error'); 
            }
         }
          else if (error.code === 'ECONNABORTED') { //connection aborted ..req was timed oit or anorted
                // Request timeout
                console.error('Request timed out');
            }
            return Promise.reject(error); //propagate the error to the calling code now it can be handled in the catch block 
    }
);

export default axiosInstance;