import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

class EditBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: "",
    };
  }

  handleChange = (e) => {
    this.setState({ boardName: e.target.value });
  };

  handleEdit = (e) => {
    // Edit board name of existing board
    console.log("Edit Board Name...");
    this.props.handleEditBoard(this.state.boardName, this.props.boardId);
    this.props.onHide();
  };

  render() {
    const { handleEditBoard, boardName, boardId, ...rest } = this.props;
    console.log(rest);
    return (
      <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Change Board Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Board Name</h5>
          <InputGroup className="mb-3">
            <FormControl
              placeholder={this.props.boardName}
              aria-label="BoardName"
              aria-describedby="basic-addon1"
              onChange={this.handleChange}
              maxLength={23}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditBoardModal;
