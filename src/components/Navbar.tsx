import React from "react";
import Container from "../utils/Container";
import { MdOutlineDarkMode } from "react-icons/md";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Container>
        <header className="navbar-header">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="navbar-header__text"> Where in the world?</h3>
          </Link>
          <div className="navbar-iconwrapper">
            <MdOutlineDarkMode style={{ marginRight: "10px" }} />
            <h3 className="navbar-iconwrapper__text">Dark Mode</h3>
          </div>
        </header>
      </Container>
    </nav>
  );
};

export default Navbar;
