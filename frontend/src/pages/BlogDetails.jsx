import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';

const BlogDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);

  const {id} = useParams();

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/blogs/${id}`, {withCredentials: true})
      if(response.status === 200){
        setLoading(false);
        setBlog(response.data.blog);
        setAuthor(response.data.author);
      }
      else{
        setError(error.response.error)
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.error){
        setError(error.response.data.error);
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlog();
  }, [id])

  if(loading){
    return <div>loading...</div>
  }

  if(error){
    return <p>{error}</p>
  }

  return (
    <Container>
      <div className='mt-20'>
        <h1 className='text-4xl font-bold'>{blog.title}</h1>
        <img src={blog.featuredImage} alt={blog.title} className='my-10 w-full h-96 object-cover rounded-2xl' />
        <div className='mt-8' dangerouslySetInnerHTML={{__html:blog.content}}/>
      </div>
    </Container>
  )
}

export default BlogDetails
