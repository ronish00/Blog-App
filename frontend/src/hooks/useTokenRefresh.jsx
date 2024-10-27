import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const useTokenRefresh = () => {

    const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/refresh-token",
        {},
        { withCredentials: true }
      );
      // Handle the response if necessary
      console.log(response.data); // Log response data or handle accordingly
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Handle unauthorized error (e.g., redirect to login)
        console.error("Session expired. Redirecting to login...");
        navigate('/login')
      } else {
        console.error("Error refreshing token:", error);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(refreshToken, 60000); // Refresh token every 1 minute

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, []);

  return null;
};

export default useTokenRefresh;
