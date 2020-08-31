import React, { Component } from "react";
import {
  Modal,
  InputGroup,
  Button,
  FormControl,
  Form,
  Badge,
  Col,
  Dropdown,
} from "react-bootstrap";
import { DateTimePicker } from "react-rainbow-components";
import Styled from "styled-components";
import { Github } from "react-color";
import { v4 as uuidv4 } from "uuid";

import EmojiPickerButton from "./EmojiPickerButton";
import ColorPickerButton from "./ColorPickerButton";

/**
 * Modal which expands with complete card information such as a larger description, date created, etc.
 */
class ViewCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagEmoji: "🐛",
      tagColor: "#00FF00",
      tagName: "",
    };
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleChangeName = (event) => {
    this.props.card.name = event.target.value;
    this.handleUpdateCard();
  };

  handleChangeDesc = (event) => {
    this.props.card.desc = event.target.value;
    this.handleUpdateCard();
  };

  handleAddTag = () => {
    const id = uuidv4();
    const tag = {
      id: id,
      color: this.state.tagColor,
      name: `${this.state.tagEmoji} ${this.state.tagName}`,
    };
    this.props.card.tags.push(tag);
    this.handleUpdateCard();
  };

  handleRemoveTag = (tagId) => {
    let a = 0;
    for (; a < this.props.card.tags.length; a++) {
      if (this.props.card.tags[a].id === tagId) {
        break;
      }
    }
    this.props.card.tags.splice(a, 1);
    this.handleUpdateCard();
  };

  handleUpdateCard = (event) => {
    console.log("Hello Boi", this.props.card);
    this.props.handleUpdateCard(this.props.card, this.props.boardId);
  };

  handleDeleteCard = (event) => {
    this.props.handleDeleteCard(this.props.card, this.props.boardId);
  };

  handleChangeTagEmoji = (emoji) => {
    this.setState({ tagEmoji: emoji });
  };
  handleChangeTagColor = (color) => {
    this.setState({ tagColor: color });
  };
  handleChangeTagName = (event) => {
    this.setState({ tagName: event.target.value });
  };

  handleChangeDue = (date) => {
    this.props.card.due = date;
    this.handleUpdateCard();
  };

  handleOnClose() {
    this.props.onHide();
  }

  render() {
    const { handleUpdateCard, handleDeleteCard, card, boardId, ...rest } = this.props;
    return (
      <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">View Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="cardName">
                <Form.Label>Card Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cardName"
                  defaultValue={this.props.card.name}
                  onChange={(value) => this.handleChangeName(value)}
                  minLength={1}
                  maxLength={100}
                  required={true}
                />
                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={7} controlId="tag-primary">
                <Form.Label style={{ marginTop: "12px" }}>Add Tag</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <EmojiPickerButton
                      default="🐛"
                      onSelect={this.handleChangeTagEmoji}
                    ></EmojiPickerButton>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <ColorPickerButton
                      default="#00FF00"
                      onSelect={this.handleChangeTagColor}
                    ></ColorPickerButton>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter a Tag Name"
                    onChange={this.handleChangeTagName}
                    maxLength={50}
                  />
                  <Button onClick={() => this.handleAddTag()} style={{ marginLeft: "8px" }}>
                    Add Tag
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="tag-container">
                <div
                  className="border"
                  style={{
                    display: "block",
                    color: "white",
                    width: "100%",
                    padding: "4px",
                    minHeight: "84px",
                  }}
                >
                  {this.props.card.tags.map((tag) => (
                    <div key={tag.id} className="d-inline">
                      <Badge
                        style={{
                          backgroundColor: tag.color,
                          marginRight: "4px",
                        }}
                      >
                        {tag.name}
                        <Button
                          style={{ padding: "0px", marginLeft: "4px" }}
                          size="sm"
                          onClick={() => this.handleRemoveTag(tag.id)}
                        >
                          &times;
                        </Button>
                      </Badge>
                    </div>
                  ))}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="lgdesc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  defaultValue={this.props.card.desc}
                  onChange={this.handleChangeDesc}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={4} controlId="date">
                <Form.Label>Due Date</Form.Label>
                <DateTimePicker
                  value={this.props.card.due}
                  onChange={this.handleChangeDue}
                  formatStyle="medium"
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleDeleteCard}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.handleOnClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ViewCardModal;
