import React from "react";
import Container from "../Container";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from "./LogoutBtn";

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: " All blogs",
      slug: "/all-blogs",
      active: true
    },
    {
      name: " My blogs",
      slug: "/my-blogs",
      active: authStatus
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !authStatus
    },
  ];

  return (
    <header className="py-8">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to='/' className="text-xl font-semibold">Blogger</Link>
          <ul className="flex items-center gap-16">
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <Link to={item.slug}>{item.name}</Link>
                </li>
              ) : null
            ))}
            {authStatus && <LogoutBtn />}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
