// Bar that will go underneath the header with tools
import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import AddBoardModal from "./AddBoardModal";
import Styled from "styled-components";

const Wrapper = Styled.div`
  color: white;
  background: grey;
`;

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  render() {
    return (
      <Wrapper>
        <Navbar id="toolbar" bg="warning">
          <Navbar.Brand>File Name / Project Name</Navbar.Brand>
          <div className="ml-auto" style={{ minWidth: "400px" }}>
            <Button className="mr-3 float-right" variant="light">
              Import File
            </Button>
            <Button className="mr-3 float-right" variant="light">
              Export File
            </Button>
            <Button
              className="mr-3 float-right"
              variant="light"
              onClick={() => this.setState({ modalShow: true })}
            >
              + Add Board
            </Button>
          </div>
          <AddBoardModal
            show={this.state.modalShow}
            handleAddBoard={this.props.handleAddBoard}
            onHide={() => this.setState({ modalShow: false })}
          />
        </Navbar>
      </Wrapper>
    );
  }
}

export default Toolbar;
