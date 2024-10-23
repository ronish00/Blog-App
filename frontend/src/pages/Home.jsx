import React from "react";
import Container from "../components/Container";
import Header from "../components/Header/Header";
import BlogCard from "../components/BlogCard";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <h1 className="text-5xl font-bold my-16">Blogs.</h1>
        <div className="top flex gap-11">
          <BlogCard size="big" />
          <div>
            <BlogCard size="sm" />
            <BlogCard size="sm" />
          </div>
        </div>
        <div className="my-12">
          <BlogCard size="md" />
          <BlogCard size="md" />
          <BlogCard size="md" />
          <BlogCard size="md" />
          <BlogCard size="md" />
        </div>
      </Container>
    </>
  );
};

export default Home;
