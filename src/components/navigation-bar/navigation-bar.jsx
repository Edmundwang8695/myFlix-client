import React from "react";
import { Navbar, NavDropdown, Nav, Container, } from "react-bootstrap";
import { Link } from "react-router-dom";

export class NavigationBar extends React.Component{
 constructor(){
     super();
     this.state= {};
 };

render(){
    const {user}= this.props;
    const movies = `/`
    const profile = `/users/${user}`;

    return (
        <Container>
            <Navbar collapseOnSelect fix="top">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" />
            <Container>
            <Nav className="me-auto">
              <NavDropdown title="MENU" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={movies} className="link-text">
                  Movies
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={profile} className="link-text">
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item to={"/"} onClick={this.onLoggedOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            </Container>
            </Navbar>
        </Container>
    );
}
}

