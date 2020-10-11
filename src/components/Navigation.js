import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    top: 0; 
    left: 0;
    height: 70px;
    max-height: 70px;
    background-color:white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: grey;
    }
  }
  
`;

export const Navigation= () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">[LOGO]Plants</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/allplants">All plants</Link>
            </Nav.Link>
          </Nav.Item>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Category 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Category 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Category 3</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Styles >
)