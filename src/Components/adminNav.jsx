import { Navbar, NavbarBrand, Nav, NavDropdown, Container, Form, Button, Dropdown } from "react-bootstrap";
import { Router } from "react-router";
import logo from "../Assets/logoNav.png";
import profil from "../Assets/profile-1.png";
import logoTwo from "../Assets/Logout.png";
import logoTri from "../Assets/Film.png";
import list from "../Assets/MyFilm.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListFilm from "./../Pages/ListFilm";

export default function AdminNav(props) {
  function setLogoutUser() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  return (
    <Navbar
      expand="lg"
      className="container-fluid fixed-top"
      style={{ backgroundColor: "#000000", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)" }}
    >
      <Container>
        <Navbar.Brand style={{ backgroundColor: "" }}>
          <Link to={"/admin"}>
            <img src={logo} width={"150px"} />
          </Link>
        </Navbar.Brand>

        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
        <Form className="d-flex ">
          <Button style={{ backgroundColor: "transparent", padding: "", border: "none" }}>
            <Dropdown>
              <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
                <img src={profil} width={"50px"} style={{ borderRadius: "50%" }} />
              </Dropdown.Toggle>

              <Dropdown.Menu className="" style={{ backgroundColor: "#000000" }}>
                <Dropdown.Item>
                  <div className="d-flex gap-2">
                    <Button className="bg-transparent" style={{ border: "none" }}>
                      <Link to={"/addfilm"}>
                        <img width={"100px"} src={logoTri} className="p-1" />
                      </Link>
                    </Button>
                  </div>
                </Dropdown.Item>{" "}
                <Dropdown.Item>
                  <div className="d-flex gap-2">
                    <Button className="bg-transparent" style={{ border: "none" }}>
                      <Link to={"/listfilm"}>
                        <img width={"100px"} src={list} className="p-1" />
                      </Link>
                    </Button>
                  </div>
                </Dropdown.Item>{" "}
                <Dropdown.Item>
                  <div className="d-flex gap-2">
                    <Button onClick={setLogoutUser} className="bg-transparent" style={{ border: "none" }}>
                      <img width={"100px"} src={logoTwo} className="p-1" />
                    </Button>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Button>
        </Form>
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
