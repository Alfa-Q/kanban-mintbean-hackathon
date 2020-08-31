import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

class AddBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: "",
    };
  }

  handleChange = (e) => {
    this.setState({ boardName: e.target.value });
  };

  handleCreate = (e) => {
    // Create a new board and add
    console.log("Creating New Board...");
    const newBoard = {
      id: uuidv4(),
      name: this.state.boardName,
      cards: [],
    };
    this.props.handleAddBoard(newBoard);
    this.props.onHide();
  };

  render() {
    const { handleAddBoard, ...rest } = this.props;
    return (
      <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="h5">Board Name</div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder=""
              aria-label="BoardName"
              aria-describedby="basic-addon1"
              onChange={this.handleChange}
              maxLength={23}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddBoardModal;
