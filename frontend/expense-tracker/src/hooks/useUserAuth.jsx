import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext, useEffect } from "react";
// import { sidebarData } from '../../utils/data'
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

// this code will be used to fetch user data and update the context for example if the user is logged in and the page is refreshed, we will fetch the user data from the server and update the context so that the user data is available in the context.

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => { //fetch user data when the component mounts
        // if user is already present in context, no need to fetch again
        if (user) return;
        let isMounted = true;
        const fetchUserInfo = async () => {
            try {
                const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
                if (isMounted && res.data) {
                    updateUser(res.data);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                if (isMounted) {
                    clearUser();
                    navigate('/login');
                }

            }
        }
        fetchUserInfo();
        return () => {
            isMounted = false; // Cleanup function to prevent state updates on unmounted component
        };
    }, [user, updateUser, clearUser, navigate]);
};

export default useUserAuth;