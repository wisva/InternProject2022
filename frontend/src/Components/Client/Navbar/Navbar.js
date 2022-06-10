import React from "react";
import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function NavbarHome(props) {
  const handleLogot = () => {
    localStorage.removeItem("userInfo");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Bookings</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/students">Students</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Nav>
            {/* <Nav.Link href="/statistics">Profile</Nav.Link> */}
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item href={`/settings/${props.id}`}>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item
                href={`/${props.role}/login`}
                onClick={handleLogot}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHome;
