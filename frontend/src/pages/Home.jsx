import React from "react";
import Container from "../components/Container";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <h1 className="text-5xl font-bold mt-16">Blogs.</h1>
      </Container>
    </>
  );
};

export default Home;
