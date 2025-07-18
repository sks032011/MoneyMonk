import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData=new FormData();// Create a new FormData object to hold the image file this is ued to send files in a multipart/form-data format which is required for file uploads 
    formData.append('image', imageFile); // Append the image file to the FormData object with the key 'image'
    try {
        const response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                'Content-Type': 'multipart/form-data' //header to indicate that the request body contains form data
            }
        })
        return response.data; // Return the response data which contains the uploaded image URL or other relevant information
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Propagate the error to be handled by the calling code 
    }
}

export default uploadImage; 