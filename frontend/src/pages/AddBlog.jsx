import React, { useState, useRef, useEffect } from 'react'
import Container from '../components/Container'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'
import RTE from '../components/RTE'

const AddBlog = () => {
  const [content, setContent] = useState('')
  const editorRef = useRef(null);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleEditorInit = (evt, editor) => {
    editorRef.current = editor; // Store the editor instance
  };

  return (
    <Container>
        <h1 className="text-5xl font-bold my-16">Add Blogs.</h1>
        <div className="w-2/4  mx-auto">
          <form action="">
            <div className="flex flex-col gap-6">
              <Input
                type="text"
                label="Title"
                placeholder="Enter your title here"
              />
              <Select
                type="text"
                label="Category"
                placeholder="Enter your password"
              />
              <RTE label='Content' content={content} onEditorChange={(e) => setContent(e.target)} onInit={handleEditorInit} ref={editorRef} />
            </div>
            <Button type="submit" children="Login" onClick={() => console.log(editorRef.current?.getContent())} className="mt-6" />
          </form>
        </div>
      </Container>
  )
}

export default AddBlog
