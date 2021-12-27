import React from "react";
import {
  Nav,
  NavLink,
  Logo,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import basma from "../assets/basma-removebg-preview.png";

function Navbar() {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <Logo src={basma} alt="basma" />
        </NavLink>
        <NavLink to="/">List</NavLink>
        {/* <Bars /> */}
        <NavMenu>
          <NavLink to="/chart" activeStyle>
            Graph
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink>Sign Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}

export default Navbar;
