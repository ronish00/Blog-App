import "./App.css";
import { useEffect, useState } from "react";
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import useTokenRefresh from "./hooks/useTokenRefresh";

function App() {

  useTokenRefresh();

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const fetchCurrentData = async () => {
    try {
      const response = await axios.get('https://blog-app-1jmq.onrender.com/api/v1/users/getCurrentUser', { withCredentials: true });
      if(response.data.success === true){
        setLoading(false);
        dispatch(login(response.data.user))
      }
      else{
        dispatch(logout())
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching current user data:", error);
      dispatch(logout()); // Log out on error
      setLoading(false); // Ensure loading state is updated
    }
  };

  useEffect(() => {
    fetchCurrentData();
  },[])

  if(loading){
    return (
      <>
        <Header />
          <div className="text-center">loading...</div>
        <Footer />
      </>
    )
  }
  else{
    return (
      <>
      <Header />
        <Outlet />
      <Footer />
    </>
    );

  }

}

export default App;
