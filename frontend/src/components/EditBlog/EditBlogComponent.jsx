import React, { useEffect, useState } from "react";
import Container from "../Container";
import Input from "../Input";
import Button from "../Button";
import RTE from "../RTE/RTE.jsx";
import Select from "../Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "../AddBlog/validation.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../store/myBlogSlice.js";

const EditBlogComponent = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get blog id from URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      featuredImage: null,
    },
    resolver: yupResolver(schema),
  });

  // Fetch blog data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://blog-app-1jmq.onrender.com/api/v1/blogs/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { title, category, content, featuredImage } = response.data.blog;

        // Reset form with fetched data
        reset({ title, category, content, featuredImage });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch blog data");
    }
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://blog-app-1jmq.onrender.com/api/v1/blogs/updateBlog/${id}`,
        {
          title: data.title,
          category: data.category,
          content: data.content,
          featuredImage: data.featuredImage[0],
        },
        { withCredentials: true, headers: {"Content-Type": "multipart/form-data"} }
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        dispatch(updateBlog(response.data.blog));
        setLoading(false);
        navigate(`/blogs/${response.data.blog._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMsg = error.response.data.error;
        toast.error(errorMsg);
      } else {
        toast.error("Something went wrong while updating blog");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [id]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <h1 className="text-5xl font-bold my-16">Edit Blog</h1>
      <div className="w-3/4 mx-auto">
        <form onSubmit={handleSubmit(handleUpdate)}>
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
              label="Category"
              id="category"
              error={errors.category?.message}
              {...register("category")}
            />
            <RTE
              label="Content"
              name="content" // Ensure name is passed
              control={control} // Pass control for react-hook-form
              error={errors.content?.message} // Error handling
            />
            <Input
              type="file"
              id="featuredImage"
              label="Featured Image"
              error={errors.featuredImage?.message}
              {...register("featuredImage")}
            />
          </div>
          <Button type="submit" className="mt-6">
            {loading ? "Updating..." : "Update Blog"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditBlogComponent;
