import React, { useState } from "react";
import Container from "../Container";
import Input from "../Input";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validation.js";
import { toast } from "react-toastify";

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        data,
        { withCredentials: true }
      );

      if (response.data.success === true) {
        dispatch(login(response.data.user));
        toast.success(response.data.message);
        reset();
        navigate("/");
      } else {
        setError(response.data.error || "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) { // Use the error message from the response
        const errorMessage = error.response?.data?.error || "An error occurred during login. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold my-16">Login.</h1>
          <p className="text-[#493738]">
            Don`t have an account?{" "}
            <Link to="/signup" className="text-black font-medium">
              Sign up
            </Link>
          </p>
        </div>
        <div className="w-2/4  mx-auto">
          <form action="" onSubmit={handleSubmit(handleLogin)} noValidate>
            <div className="flex flex-col gap-6">
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
                placeholder="Enter your password"
                id="password"
                error={errors.password?.message}
                {...register("password")}
              />
              <div className="flex justify-end">
                <a href="/">Forgot Password?</a>
              </div>
            </div>
            <Button type="submit"className="mt-6" >
              {
                loading ? "Logging in..." : 'Login'
              }
            </Button>
          </form>

        </div>
      </Container>
    </>
  );
};

export default LoginComponent;
