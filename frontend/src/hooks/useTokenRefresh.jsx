import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const useTokenRefresh = () => {

    const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "https://blog-app-1jmq.onrender.coma/api/v1/users/refresh-token",
        {},
        { withCredentials: true }
      );

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        navigate('/login')
      } 
    }
  };

  useEffect(() => {

    const oneHourInMilliseconds = 60 * 60 * 1000;
    const intervalId = setInterval(refreshToken, oneHourInMilliseconds);

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, []);

  return null;
};

export default useTokenRefresh;
