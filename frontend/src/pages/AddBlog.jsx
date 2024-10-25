import React, { useState, useRef, useEffect } from 'react'
import Container from '../components/Container'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'
import RTE from '../components/RTE'
import axios from 'axios'

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('')
  const [featuredImage, setFeaturedImage] = useState(null);
  const editorRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/blogs/createBlog', {
        title,
        category,
        content: editorRef.current?.getContent(),
        featuredImage
      }, {withCredentials: true})
  
      if(response.status === 200){
        setLoading(false);
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.error){
        setError(error.response.data.error)
      }
      else{
        setError('Failed creating blog')
      }
      setLoading(false);
    }

    setTitle('')
    setCategory('')
    setContent('')
    setFeaturedImage(null)
  }

  if(loading){
    return <div>loading...</div>
  }

  return (
    <Container>
        <h1 className="text-5xl font-bold my-16">Add Blogs.</h1>
        <div className="w-3/4  mx-auto">
          <form action="" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              <Input
                type="text"
                label="Title"
                placeholder="Enter your title here"
                value={title}
                onChange = {(e) => setTitle(e.target.value)}
              />
              <Select
                type="text"
                label="Category"
                value={category}
                onChange = {(e) => setCategory(e.target.value)}
              />
              <RTE label='Content' content={content} onEditorChange={(e) => setContent(e.target)} ref={editorRef} />
              <Input
                type="file"
                label="Featured Image"
                onChange={(e) => setFeaturedImage(e.target.files[0])}
              />
            </div>
            <Button type="submit" children="Add Blog" className="mt-6" />
          </form>
          {
            error && <p className='text-red-700 bg-red-200 text-center rounded mt-8 py-3'>{error}</p>
          }
        </div>
      </Container>
  )
}

export default AddBlog
