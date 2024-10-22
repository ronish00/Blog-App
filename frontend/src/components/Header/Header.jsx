import React from "react";
import Container from "../Container";

const Header = () => {
  const navItems = [
    {
      name: "Home",
      slug: "/home",
    },
    {
      name: "blogs",
      slug: "/blogs",
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
          <a href="/" className="text-xl font-semibold">Blogger</a>
          <ul className="flex items-center gap-16">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.slug}>{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
