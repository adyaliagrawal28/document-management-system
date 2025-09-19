import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Navbar() {
  return (
   <BsNavbar style={{ backgroundColor: "#561ba3ff" }} variant="dark" expand="lg" collapseOnSelect>
      <Container fluid>
        <BsNavbar.Brand as={Link} to="/">
          Document Manager
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/upload">
              Upload
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
