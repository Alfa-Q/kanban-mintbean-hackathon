import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

class AddBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: "",
    };

    //const { boards, addBoard } = React.useContext(AppContext);
  }

  handleChange = (e) => {
    this.setState({ boardName: e.target.value });
  };

  handleCreate = (e) => {
    // Create a new board and add
    console.log("Creating New Board...");
    const boardId = uuidv4();

    const newBoard = {
      id: boardId,
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
          <h5>Board Name</h5>
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

/*
function AddBoardModal(props) {
  super(props);
  const [boardName, setBoardName] = React.useState("");
  const [state, setState] = React.useState(props.appState);
  console.log(props.appState);
  console.log(state);
   const { boards, addBoard } = React.useContext(AppContext);

  const handleChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleCreate = (e) => {
    // Create a new board and add
    console.log("Creating New Board...");
    let boardId = `board-${++state.boardCount}`;
    state.boardOrder.push(boardId);
    const newBoard = {
      [boardId]: {
        id: boardId,
        name: boardName,
        cards: [],
      },
    };

    const newState = {
      ...this.state,
      boards: {
        ...this.state.boards,
        newBoard,
      },
    };

    setState(newState);
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
*/
export default AddBoardModal;
