import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const LogoutBtn = () => {
    
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await axios.post('https://blog-app-1jmq.onrender.com/api/v1/users/logout', {}, {withCredentials: true});
        if(response.data.success === true){
          dispatch(logout());
          toast.success(response.data.message)
        }
    }

  return (
    <button className='bg-white border border-[#ddd] px-4 py-2 rounded hover:bg-black hover:text-white' onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutBtn
