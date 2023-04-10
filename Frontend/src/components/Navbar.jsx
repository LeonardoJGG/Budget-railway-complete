import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavbarComponent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOut( { email: null, name: null}));
  }

  return (
    <div>
      <Navbar className="navBg" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>My Bank Account</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className='nav-link' to='/overview'>Overview</Link>
              <Link className='nav-link' to='/summary'>Summary</Link>

              <NavDropdown
                className="settings"
                title="Settings"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Help</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={ () => {localStorage.removeItem("authToken")} }>Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
