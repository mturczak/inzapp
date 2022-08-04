import { Button } from "react-bootstrap";
import React from "react";
import "./NavBar.css";
import { Router, Link } from "react-router-dom";

const NavBar = () => {
  return (
    
    <div className="navBar">
      <Link to="/">
      <Button >Start</Button>
      </Link>
            <Link to="/auth">
      <Button>Wyloguj</Button>
      </Link>
    </div>
    
  );
};

export default NavBar;
