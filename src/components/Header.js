import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import Styled from "styled-components";

const Wrapper = Styled.div`
  background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar bg="primary" variant="dark" color="light">
          <Navbar.Brand className="unselectable">
            <img src="/kanban-logo.png" alt="Logo" width="30" height="30" className="brandIcon" />
            Mintbean Kanban
          </Navbar.Brand>
          <Button className="ml-auto" variant="outline-light">
            Settings
          </Button>
        </Navbar>
      </Wrapper>
    );
  }
}

export default Header;
