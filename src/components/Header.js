import React, { Component } from "react";
import { Navbar, Button, DropdownButton, Dropdown, Modal, Form } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Styled from "styled-components";
import AddBoardModal from "./AddBoardModal";
import { FileSelector } from "react-rainbow-components";

const Wrapper = Styled.div`
  background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
`;

const ButtonContainer = Styled.div`
  margin-left: auto;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: null,
      showResetPopup: false,
      showAddBoardModal: false,
      showImportFileModal: false,
    };
  }

  onFileChange = (files) => {
    console.log(files);
    if (files.length > 0) {
      const file = files[0];
      this.setState({ currentFile: file });
    }
  };

  onImportFile = () => {
    console.log(this.state.currentFile);
    const reader = new FileReader();
    console.log(reader);
    console.log(this.props);
    reader.onload = (event) => this.props.handleImportFile(event.target.result);
    reader.readAsText(this.state.currentFile);
    this.props.handleImportFile();
    this.setState({ showImportFileModal: false });
  };

  onExportFile = (event) => {
    this.props.handleExportFile();
  };

  onShowAddBoardModal = (event) => {
    this.setState({ showAddBoardModal: true });
    console.log(this.props);
  };

  onShowResetPopup = (event) => {
    this.setState({ showResetPopup: true });
  };

  render() {
    return (
      <Wrapper>
        <Navbar bg="primary" variant="dark" color="light">
          <Navbar.Brand className="unselectable">
            <img src="/kanban-logo.png" alt="Logo" width="30" height="30" className="brandIcon" />
            Mintbean Kanban
          </Navbar.Brand>
          <ButtonContainer>
            <Button
              className="ml-2"
              variant="outline-light"
              onClick={() => this.setState({ showAddBoardModal: true })}
            >
              + Add Board
            </Button>
            <DropdownButton
              alignRight
              className="ml-2 d-inline"
              variant="outline-light"
              title="Options"
            >
              <Dropdown.Item onClick={() => this.setState({ showImportFileModal: true })}>
                Import File
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.onExportFile()}>Export File</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.onShowResetPopup}>Reset Kanban</Dropdown.Item>
            </DropdownButton>
          </ButtonContainer>
        </Navbar>
        <AddBoardModal
          show={this.state.showAddBoardModal}
          handleAddBoard={this.props.handleAddBoard}
          onHide={() => this.setState({ showAddBoardModal: false })}
        />
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showImportFileModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Import File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FileSelector
              className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
              label="File selector"
              placeholder="Drag & Drop or Click to Browse"
              bottomHelpText="Select only one file"
              variant="multiline"
              onChange={this.onFileChange}
              bottomHelpText="Select only one file"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.onImportFile}>
              Import File
            </Button>
          </Modal.Footer>
        </Modal>
        <AlertResetKanban
          show={this.state.showResetPopup}
          hide={() => this.setState({ showResetPopup: false })}
          handleResetKanban={this.props.handleResetKanban}
        ></AlertResetKanban>
      </Wrapper>
    );
  }
}

class AlertResetKanban extends Component {
  onConfirm = () => {
    console.log("Confirm");
    this.props.handleResetKanban();
    this.props.hide();
  };

  onCancel = () => {
    console.log("Cancel");
    this.setState({ show: false });
    this.props.hide();
  };

  render() {
    const { show } = this.props;
    return (
      <SweetAlert
        danger
        showCancel
        confirmBtnBsStyle="danger"
        confirmBtnText="Reset Kanban"
        title="Are You Sure You Want to Reset The Kanban?"
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        show={show}
      >
        This will permanently remove all of your boards and cards!
      </SweetAlert>
    );
  }
}

export default Header;
