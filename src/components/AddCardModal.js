import React from "react";
import { Modal, Button, Form, FormControl, FormText } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

class AddCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
      cardTags: [],
      cardDesc: "",
      cardDueDate: "",
    };
  }

  handleChangeName = (e) => {
    this.setState({ cardName: e.target.value });
  };

  handleChangeDesc = (e) => {
    this.setState({ cardDesc: e.target.value });
  };

  handleChangeDueDate = (e) => {
    this.setState({ cardDueDate: e.target.value });
  };

  handleChangeTags = (e) => {
    this.setState({ cardTags: e.target.value });
  };

  handleCreate = (e) => {
    console.log("Creating New Card...");

    // Create a new card and add
    const newCard = {
      id: uuidv4(),
      name: this.state.cardName,
      tags: [],
      desc: this.state.cardDesc,
      due: this.state.cardDueDate,
      pinned: false,
    };

    console.log(newCard, this.props.boardId);
    this.props.handleAddCard(newCard, this.props.boardId);
    this.props.onHide();
  };

  render() {
    const { handleAddCard, ...rest } = this.props;
    return (
      <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="cardName">
            <Form.Label>Card Name</Form.Label>
            <Form.Control
              type="text"
              name="cardName"
              placeholder="Enter a Card Name"
              minLength={1}
              maxLength={100}
              onChange={this.handleChangeName}
            />
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="tag">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Primary Tag"
              required={true}
              onChange={this.handleChangeTags}
            />
          </Form.Group>
          <Form.Group controlId="lgdesc">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows="4" onChange={this.handleChangeDesc} />
          </Form.Group>
          <Form.Group controlId="lgdesc">
            <Form.Label>Due</Form.Label>
            <Form.Control
              as="text"
              placeholder="This is Temporary"
              onChange={this.handleChangeDueDate}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.handleCreate}>
            Add Card
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddCardModal;
