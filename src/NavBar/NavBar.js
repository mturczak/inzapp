import { Button } from "react-bootstrap";
import React from "react";
import "./NavBar.css"

const NavBar =  () => {
    return (
        <div className="navBar">
            <Button>Start</Button>
            <Button>Utwórz Rezerwacje</Button>
            <Button>Wyloguj</Button>
        </div>
    ) 
        
}

export default NavBar;