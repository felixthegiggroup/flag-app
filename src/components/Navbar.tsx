import React from "react";
import Container from "../utils/Container";
import { MdOutlineDarkMode } from "react-icons/md";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props: { setDarkMode: any; darkMode: boolean }) => {
  return (
    <nav className={`${props.darkMode ? "bg-dark" : "bg-light"} navbar`}>
      <Container>
        <header className="navbar-header">
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <h3
              className={`${
                props.darkMode ? "text-light" : "text-dark"
              } navbar-header__text`}
            >
              {" "}
              Where in the world?
            </h3>
          </Link>
          <div
            className={`${
              props.darkMode ? " text-light" : "text-dark"
            } navbar-iconwrapper`}
            onClick={() => props.setDarkMode(!props.darkMode)}
          >
            <MdOutlineDarkMode style={{ marginRight: "10px" }} />
            <h3 className={` navbar-iconwrapper__text`}>Dark Mode</h3>
          </div>
        </header>
      </Container>
    </nav>
  );
};

export default Navbar;
