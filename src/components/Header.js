import React from "react";
import { Navbar, Button } from "react-bootstrap";

function Header(props) {
  return (
    <Navbar id="header" bg="primary" variant="dark" color="light">
      <Navbar.Brand className="unselectable">
        <img src="/kanban-logo.png" alt="Logo" width="30" height="30" className="brandIcon" />
        Mintbean Kanban
      </Navbar.Brand>
      <Button className="ml-auto" variant="outline-light">
        Settings
      </Button>
    </Navbar>
  );
}

export default Header;
