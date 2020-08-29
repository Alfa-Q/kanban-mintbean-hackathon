// Bar that will go underneath the header with tools
import React from "react";
import { Navbar, Button } from "react-bootstrap";
import AddBoardModal from "./AddBoardModal";

function Toolbar(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Navbar id="toolbar" bg="warning">
      <Navbar.Brand>File Name / Project Name</Navbar.Brand>
      <div className="ml-auto">
        <Button className="mr-3" variant="light">
          Import File
        </Button>
        <Button className="mr-3" variant="light">
          Export File
        </Button>
        <Button className="" variant="light" onClick={() => setModalShow(true)}>
          + Add Board
        </Button>
      </div>
      <AddBoardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>
  );
}

export default Toolbar;
