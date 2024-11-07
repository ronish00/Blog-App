import { Blog } from "../models/blog.model.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    console.log(title, content, category);
    const user = req.user;

    if (!(title && content && category)) {
      throw new Error("All fields are required");
    }

    const featuredImagePath = req.file?.path;
    if(!featuredImagePath){
      throw new Error("Featured Image is required");
    }

    const featuredImage = await uploadOnCloudinary(featuredImagePath);
    if(!featuredImage){
      throw new Error("Error uploading featured image");
    }

    const blog = await Blog.create({
      title,
      content,
      category,
      featuredImage: featuredImage.url,
      author: user._id,
    });

    if (!blog) {
      throw new Error("Failed to create blog");
    }

    await blog.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({
        blog: blog,
        message: "Blog created successfully",
        success: true,
      });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Error creating blog",
      error: error.message || "Unknown error",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      throw new Error("Failed to delete blog");
    }

    return res
      .status(200)
      .json({ message: "Blog deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete blog",
      error: error.message || "Unknown error",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, category } = req.body;
    
    let featuredImage;
    if (req.file && req.file.path) {
      featuredImage = await uploadOnCloudinary(req.file.path);
    }

    const updateData = {
      title,
      content,
      category,
      ...(featuredImage && { featuredImage: featuredImage.url })
    };

    const blog = await Blog.findByIdAndUpdate(blogId, {
      $set: updateData,
    }, { new: true });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).json({
      blog,
      message: "Blog updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating blog",
      error: error.message || "Unknown error",
    });
  }
};

const getOwnBlogs = async (req, res) => {
    try {
        const blog = await Blog.aggregate([
            {
                $match: {author: req.user._id}
            },
            {
                $lookup: {
                    from : "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails",
                    pipeline: [
                        {
                            $project: {
                                fullname: 1,
                                email: 1,
                                avatar: 1
                            }
                        }
                    ]
                }
            }
        ])
    
        if(!blog){
            throw new Error(404, "Blog not found")
        }
    
        return res
        .status(200)
        .json(blog);
    } catch (error) {
        return res
        .status(500)
        .json({
            message: "Error while fetching blog",
            error: error.message || 'unknown error'
        })
    }

}

const getAllBlogs = async(req, res) => {
    try {
        const allBlogs = await Blog.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails",
                    pipeline: [
                        {
                            $project: {
                                fullname: 1,
                                email: 1,
                                avatar: 1
                            }
                        }
                    ]
                }
            }
        ]);
    
        if(!allBlogs){
            throw new Error(404, "No blog found")
        }
    
        return res
        .status(200)
        .json(allBlogs)
    } catch (error) {
        return res
        .status(500)
        .json({
            message: "Error fetching blog",
            error: error.message || 'Unknown error'
        })
    }
}

const getABlog = async(req, res) => {
  try {
    const id = req.params.id
    if(!id){
      throw new Error("Id not found")
    }
    const blog = await Blog.findById(id);
    if(!blog){
      throw new Error("Blog not found")
    }

    const user = await User.findById(blog.author).select("-password -refreshToken -createdAt -updatedAt");
    if(!user){
      throw new Error("Author not found");
    }

    return res
    .status(200)
    .json({
      blog,
      author: user,
      message: "Blog successfully fetched"
    })
  } catch (error) {
    return res
    .status(500)
    .json({
      message: "Error fetching blog",
      error: error.message || 'Unknown error'
    })
  }
}



export { createBlog, deleteBlog, updateBlog, getOwnBlogs, getAllBlogs, getABlog };
