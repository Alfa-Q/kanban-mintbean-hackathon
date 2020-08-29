import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import AppContext from "../AppContext";

function AddBoardModal(props) {
  const [boardName, setBoardName] = React.useState("");
  const { boards, addBoard } = React.useContext(AppContext);

  const handleChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleCreate = (e) => {
    // Create a new board and add
    console.log("Creating New Board...");
    addBoard(boardName);
    props.onHide();
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add New Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Board Name</h5>
        <InputGroup className="mb-3">
          <FormControl
            placeholder=""
            aria-label="BoardName"
            aria-describedby="basic-addon1"
            onChange={handleChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBoardModal;
