import React, { Component } from "react";
import Styled from "styled-components";

const Main = Styled.div`
  height: 1000px;
`;

const Top = Styled.div`
  background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
  height: 1000px;
  color: white;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`;

class AddCardModal extends Component {
  render() {
    return (
      <Main>
        <Top></Top>
      </Main>
    );
  }
}

export default AddCardModal;
