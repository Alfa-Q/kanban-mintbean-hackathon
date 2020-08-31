import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";

class ColorPickerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      currentColor: { hex: props.default },
    };
  }

  handleChangeComplete = (color) => {
    console.log(color);
    // Call passed in prop for when value changed
    this.setState({ showPicker: false, currentColor: color });
    this.props.onSelect(color.hex);
  };

  handleChange = (color) => {
    this.setState({ currentColor: color });
  };

  handleTogglePicker = (emoji) => {
    console.log("Toggle");
    this.setState({ showPicker: !this.state.showPicker });
  };

  render() {
    const { showPicker, currentColor } = this.state;
    return (
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        onClick={this.handleTogglePicker}
        onToggle={showPicker}
        overlay={
          <Popover>
            <SketchPicker
              color={currentColor}
              onChange={this.handleChange}
              onChangeComplete={this.handleChangeComplete}
            ></SketchPicker>
          </Popover>
        }
      >
        <Button
          variant="secondary"
          style={{
            backgroundColor: currentColor.hex,
            margin: "0 0 !important",
            minWidth: "48px",
          }}
        ></Button>
      </OverlayTrigger>
    );
  }
}

export default ColorPickerButton;
