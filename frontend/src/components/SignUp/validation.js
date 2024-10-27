import * as yup from "yup";

const schema = yup.object({
    fullname: yup.string().required("Fullname is required"),
    email: yup.string("Email is not valid").required("Email is required"),
    password: yup.string().required("Password is required")
})

export default schema