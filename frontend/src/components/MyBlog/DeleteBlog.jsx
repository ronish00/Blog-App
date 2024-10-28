import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog } from '../../store/myBlogSlice';
import { toast } from "react-toastify";

const DeleteBlog = ({ author, blogId, className = "" }) => {
  const [loading, setLoading] = useState(false);  // To handle loading state
  const user_id = useSelector((state) => state.auth.userData?._id);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch()

  const handleDeleteBlog = async () => {
    try {
      setLoading(true); // Start loading

      // Check if user is logged in
      if (!authStatus) {
        toast.error("You're not logged in")
        return;
      }

      // Check if the user is the author
      if (user_id !== author) {
        toast.error("You are not the author of this blog")
        return;
      }

      // Proceed to delete the blog
      const response = await axios.delete(
        `http://localhost:3000/api/v1/blogs/deleteBlog/${blogId}`,
        {withCredentials: true}
      );

      if (response.status === 200) {
        dispatch(deleteBlog(blogId))
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong while deleting the blog");
      }
      console.log(error)
    } finally {
      setLoading(false);  // Stop loading after request
    }
  };

  return (
    <>
      <button onClick={handleDeleteBlog} disabled={loading} className={`${className}`}>
        {loading ? 'Deleting...' : 'Delete Blog'}
      </button>
    </>
  );
};

export default DeleteBlog;
