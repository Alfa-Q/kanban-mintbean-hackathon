import React, { Component } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import Styled from "styled-components";

// When emoji button has no selection - greyed out
const Unset = Styled.div`
  color: "grey" !important;
  background-color: "grey";
`;

class EmojiPickerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      currentEmoji: props.default,
    };
    this.props.onSelect(props.default);
  }

  // Toggle the emoji picker when clicked
  handleSelect = (emoji) => {
    console.log(emoji);
    // Call passed in prop for when value changed
    this.props.onSelect(emoji.native);
    this.setState({ showPicker: false, currentEmoji: emoji.native });
  };

  handleTogglePicker = (emoji) => {
    console.log("Toggle");
    this.setState({ showPicker: !this.state.showPicker });
  };

  render() {
    return (
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        onClick={this.handleTogglePicker}
        onToggle={this.state.showPicker}
        overlay={
          <Popover>
            <Picker onSelect={this.handleSelect} showPreview={false} showSkinTones={false}></Picker>
          </Popover>
        }
      >
        <Button variant="secondary">{this.state.currentEmoji}</Button>
      </OverlayTrigger>
    );
  }
}

export default EmojiPickerButton;
