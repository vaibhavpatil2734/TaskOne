import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">TaskOne</Link>
      </div>
      <div>
        <Link to="/">SignIn</Link>
        <Link to="/register">SignUp</Link>
      </div>
    </nav>
  );
};

export default Navbar;
