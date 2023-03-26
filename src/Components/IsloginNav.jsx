import { Navbar, NavbarBrand, Nav, NavDropdown, Container, Form, Button, Dropdown } from "react-bootstrap";
import { Router } from "react-router";
import logo from "../Assets/logoNav.png";
import profil from "../Assets/profile-1.png";
import logoTwo from "../Assets/Logout.png";
import logoTri from "../Assets/Film.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

export default function IsLoginNav(props) {
  const [registerShow, setRegisterShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);

  return (
    <Navbar expand="lg" className="container-fluid fixed-top" style={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)" }}>
      <RegisterModal show={registerShow} onHide={() => setRegisterShow(false)} />
      <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
      <Container>
        <Navbar.Brand style={{ backgroundColor: "" }}>
          <Link to={"/"}>
            <img src={logo} width={"150px"} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end ">
          <div className="d-flex gap-3 mt-3">
            <Button onClick={() => setLoginShow(true)} style={{ backgroundColor: "#000000", border: "none" }}>
              Login
            </Button>
            <Button onClick={() => setRegisterShow(true)} style={{ backgroundColor: "#CD2E71", border: "none" }}>
              Register
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <Navbar bg="dark" style={{ backgroundColor: "#000000" }} expand="lg">
    //   <Container>
    //     <Navbar.Brand href="#home">
    //       <img src={logoOne} alt="" />
    //     </Navbar.Brand>
    //     <Navbar.Collapse id="basic-navbar-nav">

    //       <Nav className="me-auto">
    //         <NavDropdown style={{ color: "white" }} id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}
