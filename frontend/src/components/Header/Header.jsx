import React from "react";
import Container from "../Container";
import { Link } from 'react-router-dom'

const Header = () => {
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "blogs",
      slug: "/all-blogs",
    },
    {
      name: "Login",
      slug: "/login",
    },
    {
      name: "Sign up",
      slug: "/signup",
    },
  ];

  return (
    <header className="py-8">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to='/' className="text-xl font-semibold">Blogger</Link>
          <ul className="flex items-center gap-16">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link to={item.slug}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
