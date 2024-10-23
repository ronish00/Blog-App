import React from 'react'
import Header from '../components/Header/Header'
import Container from '../components/Container'
import BlogCard from '../components/BlogCard'

const AllBlogs = () => {
  return (
    <>
      <Container>
        <h1 className="text-5xl font-bold my-16">All Blogs.</h1>
        <div>
            <BlogCard size="md" />
            <BlogCard size="md" />
            <BlogCard size="md" />
            <BlogCard size="md" />
            <BlogCard size="md" />
            <BlogCard size="md" />
            <BlogCard size="md" />
            <BlogCard size="md" />
        </div>
      </Container>
    </>
  )
}

export default AllBlogs
