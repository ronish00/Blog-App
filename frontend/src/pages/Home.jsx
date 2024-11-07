import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import BlogCard from "../components/BlogCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/allBlogSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { allBlogs, loading, error } = useSelector((state) => state.allBlogs);

  //reverse the blogs to get recent blog
  const reverseBlogs = [...allBlogs].reverse();

  // const fetchAllBlogs = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://blog-app-1jmq.onrender.com/api/v1/blogs/getAllBlogs",
  //       { withCredentials: true }
  //     );
  //     if (response.status === 200) {
  //       dispatch(setBlogs(response.data));
  //     } else {
  //       setError(response.data.error);
  //     }
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.data.error &&
  //       error.response.data.error
  //     ) {
  //       setError(error.response.data.error);
  //     } else {
  //       setError("Error fetching all Blogs");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Container>
        <h1 className="text-5xl font-bold my-16">Recent Blogs.</h1>
        {reverseBlogs.length === 0 ? (
          <p>No blog found</p>
        ) : (
          <>
            <div className="top flex gap-11 mt-16">
              {reverseBlogs.slice(0, 1).map((blog) => (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  content={blog.content}
                  date={blog.createdAt}
                  category={blog?.category}
                  featuredImage={blog?.featuredImage}
                  size="big"
                  slug={blog._id}
                />
              ))}
              <div>
                {reverseBlogs.slice(1, 3).map((blog) => (
                  <BlogCard
                    key={blog._id}
                    title={blog.title}
                    content={blog.content}
                    date={blog.createdAt}
                    category={blog?.category}
                    featuredImage={blog?.featuredImage}
                    size="sm"
                    slug={blog._id}
                  />
                ))}
              </div>
            </div>
            <div className="my-12">
              {reverseBlogs.slice(3).map((blog) => (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  content={blog.content}
                  date={blog.createdAt}
                  category={blog?.category}
                  featuredImage={blog?.featuredImage}
                  size="md"
                  slug={blog._id}
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
