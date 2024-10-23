import React from "react";
import Header from "../components/Header/Header";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";

const SignUp = () => {
  return (
    <>
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold my-16">Sign up.</h1>
          <p className="text-[#493738]">Already have an account? <a href="/" className="text-black font-medium">Login</a></p>
        </div>
        <div className="w-2/4  mx-auto">
          <form action="">
            <div className="flex flex-col gap-6">
              <Input type="text" label="Fullname" placeholder="Enter your fullname" />
              <Input type="email" label="Email" placeholder="Enter your email" />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
            </div>
            <Button children="Sign up" className="mt-6" />
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
