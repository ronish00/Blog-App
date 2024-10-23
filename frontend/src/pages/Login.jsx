import React from "react";
import Header from "../components/Header/Header";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  return (
    <>
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold my-16">Login.</h1>
          <p className="text-[#493738]">Don`t have an account? <a href="/" className="text-black font-medium">Sign up</a></p>
        </div>
        <div className="w-2/4  mx-auto">
          <form action="">
            <div className="flex flex-col gap-6">
              <Input type="email" label="Email" placeholder="Enter your email" />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex justify-end">
                <a href="/">Forgot Password?</a>
              </div>
            </div>
            <Button children="Login" className="mt-6" />
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
