import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const useTokenRefresh = () => {

    const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "https://blog-app-1jmq.onrender.com/api/v1/users/refresh-token",
        {},
        { withCredentials: true }
      );

    } catch (error) {
      navigate('/login')
    }
  };

  useEffect(() => {
    const intervalId = setInterval(refreshToken, 60000); // Refresh token every 1 minute

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, []);

  return null;
};

export default useTokenRefresh;
