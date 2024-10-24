import React, { useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
  
      const response = await axios.post('http://localhost:3000/api/v1/users/register', {
        fullname,
        email,
        password
      },{withCredentials: true})
  
      if(response.data.success === true){
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold my-16">Sign up.</h1>
          <p className="text-[#493738]">Already have an account? <Link to="/login" className="text-black font-medium">Login</Link></p>
        </div>
        <div className="w-2/4  mx-auto">
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <Input type="text" label="Fullname" placeholder="Enter your fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
              <Input type="email" label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
