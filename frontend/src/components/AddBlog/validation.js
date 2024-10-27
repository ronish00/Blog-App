import * as yup from 'yup'

const schema = yup.object({
    title: yup.string().required("Title is required"),
    category: yup.string().required("Please choose a category"),
    content: yup.string().required("Content is required"),
    featuredImage: yup.mixed().required("Featured image is required")
})

export default schema