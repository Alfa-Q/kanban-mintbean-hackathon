import React from "react";
import { Modal, Button, Form, FormControl, FormText, Col, InputGroup } from "react-bootstrap";
import { Field, DateTimePicker, MenuDivider } from "react-rainbow-components";
import { v4 as uuidv4 } from "uuid";
import Styled from "styled-components";

import EmojiPickerButton from "./EmojiPickerButton";
import ColorPickerButton from "./ColorPickerButton";

class AddCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      cardName: "",
      tagPrimary: {
        name: "",
        emoji: "",
        color: "green",
      },
      tagSecondary: {
        name: "",
        emoji: "",
        color: "red",
      },
      cardDesc: "",
      cardDue: new Date(Date.now()),
    };

    this.state = {
      ...this.defaultState,
    };
  }

  handleChangeName = (e) => {
    this.setState({ cardName: e.target.value });
  };

  handleChangeDesc = (e) => {
    this.setState({ cardDesc: e.target.value });
  };

  handleChangeTagPrimaryEmoji = (emoji) => {
    console.log(emoji);
    this.setState({
      tagPrimary: {
        ...this.state.tagPrimary,
        emoji: emoji,
      },
    });
  };

  handleChangeTagPrimaryColor = (color) => {
    this.setState({
      tagPrimary: {
        ...this.state.tagPrimary,
        color: color,
      },
    });
  };

  handleChangeTagSecondaryEmoji = (emoji) => {
    this.setState({
      tagSecondary: {
        ...this.state.tagSecondary,
        emoji: emoji,
      },
    });
  };

  handleChangeTagSecondaryColor = (color) => {
    this.setState({
      tagSecondary: {
        ...this.state.tagSecondary,
        color: color,
      },
    });
    console.log("Set Color: ", color);
  };

  handleChangeTagPrimary = (e) => {
    this.setState({
      tagPrimary: {
        ...this.state.tagPrimary,
        name: e.target.value,
      },
    });
  };

  handleChangeTagSecondary = (e) => {
    this.setState({
      tagSecondary: {
        ...this.state.tagSecondary,
        name: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    // Prevent reload of page
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      console.log("Card is Invalid!");
      e.stopPropagation();
    }

    // Create a new card and add to board
    console.log("Card id valid");

    // Temporary solution for tags (limit to primary + secondary)
    let tags = [];
    if (this.state.tagPrimary !== "") {
      tags.push({
        id: uuidv4(),
        name: `${this.state.tagPrimary.emoji} ${this.state.tagPrimary.name}`,
        color: this.state.tagPrimary.color,
      });
    }
    if (!this.state.tagSecondary !== "") {
      tags.push({
        id: uuidv4(),
        name: `${this.state.tagSecondary.emoji} ${this.state.tagSecondary.name}`,
        color: this.state.tagSecondary.color,
      });
    }

    const newCard = {
      id: uuidv4(),
      name: this.state.cardName,
      tags: tags, // Currently not supported // this.state.cardTags,
      desc: this.state.cardDesc,
      due: this.state.cardDue,
      pinned: false,
    };

    console.log(newCard);

    this.props.handleAddCard(newCard, this.props.boardId);

    this.setState(this.defaultState);
    this.props.onHide();
  };

  render() {
    const { handleAddCard, boardId, ...rest } = this.props;
    return (
      <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="cardName">
                <Form.Label>Card Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cardName"
                  placeholder="Enter a Card Name"
                  minLength={1}
                  maxLength={100}
                  onChange={this.handleChangeName}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={5} controlId="tag-primary">
                <Form.Label>Primary Tag</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <EmojiPickerButton
                      default="🐛"
                      onSelect={this.handleChangeTagPrimaryEmoji}
                    ></EmojiPickerButton>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <ColorPickerButton
                      default="#00FF00"
                      onSelect={this.handleChangeTagPrimaryColor}
                    ></ColorPickerButton>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter a Primary Tag"
                    onChange={this.handleChangeTagPrimary}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={5} controlId="tag-secondary">
                <Form.Label>Secondary Tag</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <EmojiPickerButton
                      default="🚀"
                      onSelect={this.handleChangeTagSecondaryEmoji}
                    ></EmojiPickerButton>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <ColorPickerButton
                      default="#FF0000"
                      onSelect={this.handleChangeTagSecondaryColor}
                    ></ColorPickerButton>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter a Secondary Tag"
                    onChange={this.handleChangeTagSecondary}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="desc">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="4" onChange={this.handleChangeDesc} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={3} controlId="date">
                <Form.Label>Due Date</Form.Label>
                <DateTimePicker
                  value={this.state.cardDue}
                  onChange={(value) => this.setState({ cardDue: value })}
                  formatStyle="medium"
                />
              </Form.Group>
            </Form.Row>
            <hr />
            <Button type="submit" variant="success">
              Add Card
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddCardModal;
