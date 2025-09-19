import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Container, Nav } from "react-bootstrap";

function Navbar() {
  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          Document Manager
        </BsNavbar.Brand>
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
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
