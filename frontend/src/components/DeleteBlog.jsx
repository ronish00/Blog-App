import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog } from '../store/myBlogSlice';

const DeleteBlog = ({ author, blogId, className = "" }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // To handle loading state
  const user_id = useSelector((state) => state.auth.userData?._id);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch()

  const handleDeleteBlog = async () => {
    try {
      setError(null);  // Clear previous error
      setLoading(true); // Start loading

      // Check if user is logged in
      if (!authStatus) {
        setError("You are not logged in");
        return;
      }

      // Check if the user is the author
      if (user_id !== author) {
        setError("You are not the author of this blog");
        return;
      }

      console.log(blogId)

      // Proceed to delete the blog
      const response = await axios.delete(
        `http://localhost:3000/api/v1/blogs/deleteBlog/${blogId}`,
        {withCredentials: true}
      );

      if (response.status === 200) {
        dispatch(deleteBlog(blogId))
      } else {
        setError("Failed to delete blog");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong while deleting the blog");
      }
    } finally {
      setLoading(false);  // Stop loading after request
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleDeleteBlog} disabled={loading} className={`${className}`}>
        {loading ? 'Deleting...' : 'Delete Blog'}
      </button>
    </>
  );
};

export default DeleteBlog;
