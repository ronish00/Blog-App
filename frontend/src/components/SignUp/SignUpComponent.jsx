import React, {useState} from "react";
import Container from "../Container";
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import schema from "./validation.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSignup = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        data,
        { withCredentials: true }
      );

      if (response.data.success === true) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred during login. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold my-16">Sign up.</h1>
          <p className="text-[#493738]">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-medium">
              Login
            </Link>
          </p>
        </div>
        <div className="w-2/4  mx-auto">
          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="flex flex-col gap-6">
              <Input
                type="text"
                label="Fullname"
                id="fullname"
                placeholder="Enter your fullname"
                error={errors.fullname?.message}
                {...register("fullname")}
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                id="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                type="password"
                label="Password"
                id="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>
            <Button className="mt-6" >
                {
                    loading ? "Signing up..." : "Sign up"
                }
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUpComponent;
