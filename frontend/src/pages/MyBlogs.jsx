import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../store/myBlogSlice.js";
import axios from "axios";
import Container from "../components/Container.jsx";
import BlogCard from "../components/BlogCard.jsx";

const MyBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.myBlogs.blogs);
  console.log(blogs);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/blogs/getOwnBlogs",
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(setBlogs(response.data));
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching blog: ", error);
      setError("Failed to fetch blogs. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Container>
        <h1 className="text-5xl font-bold my-16">My Blogs.</h1>
        <ul>
          {blogs.length === 0 ? (
            <p>No blogs found</p>
          ) : (
            blogs.map((blog) => ( 
              <li key={blog._id}>
                <BlogCard
                  size="md"
                  title={blog.title}
                  content={blog.content}
                  date={blog.createdAt}
                  category={blog?.category}
                />
              </li>
            ))
          )}
        </ul>
      </Container>
    </>
  );
};

export default MyBlogs;
