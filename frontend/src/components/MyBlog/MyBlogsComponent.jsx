import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../../store/myBlogSlice.js";
import axios from "axios";
import Container from "../Container.jsx";
import BlogCard from "../BlogCard.jsx";
import DeleteBlog from "./DeleteBlog.jsx";
import { useNavigate } from "react-router-dom";

const MyBlogsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.myBlogs.blogs);
  const reverseBlogs = [...blogs].reverse();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://blog-app-1jmq.onrender.com/api/v1/blogs/getOwnBlogs",
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(setBlogs(response.data));
        setLoading(false);
      }
    } catch (error) {
      if (error.reponse && error.response.data && error.response.data.error) {
        const errorMsg = error.response.data.error;
        setError(errorMsg);
        setLoading(false);
      } else {
        setError("Something went wrong while fetching blogs");
      }
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
            reverseBlogs.map((blog) => (
              <li key={blog._id}>
                <div className="relative">
                  <BlogCard
                    size="md"
                    title={blog.title}
                    content={blog.content}
                    date={blog.createdAt}
                    category={blog?.category}
                    featuredImage={blog?.featuredImage}
                    slug={blog._id}
                  />
                  <div className="absolute right-6 top-6 flex items-center gap-4">
                    <button
                      onClick={(e) => navigate(`edit-blog/${blog._id}`)}
                      className="bg-none text-blue-700 p-0"
                    >
                      Update Blog
                    </button>
                    <DeleteBlog
                      author={blog.author}
                      blogId={blog._id}
                      className="text-red-600"
                    />
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </Container>
    </>
  );
};

export default MyBlogsComponent;
