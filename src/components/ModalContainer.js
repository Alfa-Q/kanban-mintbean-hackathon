import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertClearBoard: false,
    };
  }

  render() {
    return (
      <AlertClearBoard
        show={this.state.showAlertClearBoard}
        hide={() => this.setState({ showAlertClearBoard: false })}
        handleClearBoard={this.props.handleClearBoard}
      ></AlertClearBoard>
    );
  }
}

class AlertClearBoard extends Component {
  onConfirm = () => {
    console.log("Confirm");
    // Call Clear Board
    this.props.hide();
  };

  onCancel = () => {
    console.log("Cancel");
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
        title="Are You Sure You Want to Clear the Board?"
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        show={show}
      >
        This will permanently remove all cards on the board!
      </SweetAlert>
    );
  }
}

export default ModalContainer;
