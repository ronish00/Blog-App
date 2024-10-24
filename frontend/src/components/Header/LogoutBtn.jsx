import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js'
import axios from 'axios'

const LogoutBtn = () => {
    
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await axios.post('http://localhost:3000/api/v1/users/logout', {}, {withCredentials: true});
        console.log(response)
        if(response.data.success === true){
          dispatch(logout());
        }
    }

  return (
    <button className='bg-white border border-[#ddd] px-4 py-2 rounded hover:bg-black hover:text-white' onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutBtn
