import React, { useEffect } from "react";
import Container from "../components/Container";
import BlogCard from "../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../store/allBlogSlice";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const { allBlogs, loading, error } = useSelector(
    (state) => state.allBlogs
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  },[]);

  if(loading){
    return <div>loading...</div>
  }

  if(error){
    return <div>{error}</div>
  }

  return (
    <>
      <Container>
        <h1 className="text-5xl font-bold my-16">All Blogs.</h1>
        <div>
          {allBlogs.map((blog) => (
            <BlogCard
              size="md"
              title={blog.title}
              content={blog.content}
              date={blog.createdAt}
              category={blog?.category}
              key={blog._id}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default AllBlogs;
