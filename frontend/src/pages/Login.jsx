import React, { useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.data.success === true) {
        dispatch(login(response.data.user));
        navigate("/");
      } else {
        setError(response.data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Use the error message from the response
      } else {
        setError("An error occurred during login. Please try again."); // Default fallback error
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold my-16">Login.</h1>
          <p className="text-[#493738]">
            Don`t have an account?{" "}
            <a href="/" className="text-black font-medium">
              Sign up
            </a>
          </p>
        </div>
        <div className="w-2/4  mx-auto">
          <form action="" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end">
                <a href="/">Forgot Password?</a>
              </div>
            </div>
            <Button type="submit" children="Login" className="mt-6" />
          </form>

          {
            error && <p className="text-red-600 mt-5 text-center">{error}</p>
          }
        </div>
      </Container>
    </>
  );
};

export default Login;
