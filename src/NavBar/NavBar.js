import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from "react";
import "./NavBar.css";
import { Router, Link } from "react-router-dom";

const NavBar = () => {
  return (<div className="navbar">
    <nav class="navbar navbar-light ">
    <Link to="/">
        <button className="btn btn-secondary mr-1 ">Start</button>
      </Link>
      <Link to="/reservations_preview">
        <button className="btn btn-secondary pd-">Rezerwacje</button>
      </Link>
  <Link to="/authlogin">
        <button className="btn btn-secondary pd-">Wyloguj</button>
      </Link>
    </nav>


  {/* <div className="btn-group mb-2 btn-group-lg">
    <Link to="/">
        <button className="btn btn-secondary ">Start</button>
      </Link>
      <Link to="/auth">
        <button className="btn btn-secondary pd-">Wyloguj</button>
      </Link>
      </div> */}
      </div>
  );
};

export default NavBar;
