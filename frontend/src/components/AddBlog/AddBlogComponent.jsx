import React, { useState, useRef } from "react";
import Container from "../Container";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import RTE from "../RTE/RTE.jsx";
import axios from "axios";
import schema from "./validation.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddBlogComponent = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      content: "",
      featuredImage: null,
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('https://blog-app-1jmq.onrender.com/api/v1/blogs/createBlog', 
        {
          title: data.title,
          category: data.category,
          content: data.content,
          featuredImage: data.featuredImage[0],
        },
        {withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }})


      if(response.status === 200){
        setLoading(false);
        reset();
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      if(error.response && error.response.data && error.response.data.error){
        const errorMessage = error.response.data.error
        toast.error(errorMessage)
      }
    } finally{
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1 className="text-5xl font-bold my-16">Add Blogs.</h1>
      <div className="w-3/4  mx-auto">
        <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              label="Title"
              placeholder="Enter your title here"
              id="title"
              error={errors.title?.message}
              {...register("title")}
            />
            <Select
              type="text"
              label="Category"
              id="category"
              error={errors.category?.message}
              {...register("category")}
            />
            <RTE label="Content" name="content" control={control} error={errors.content?.message}  />
            <Input
              type="file"
              id="featuredImage"
              label="Featured Image"
              error={errors.featuredImage?.message}
              {...register("featuredImage")}
            />
          </div>
          <Button type="submit" className="mt-6" disabled={loading}>
            {
              loading ? 'Creating...' : 'Create Blog'
            }
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddBlogComponent;
