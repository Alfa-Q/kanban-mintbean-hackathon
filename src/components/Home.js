import React, { Component } from "react";
import Styled from "styled-components";
import { useHistory } from "react-router-dom";

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

const Brand = Styled.div`
  display: block;
`;

const Right = Styled.div`
  float: right;
  margin-top: 8px;
`;

class AddCardModal extends Component {
  routeChange = () => {
    let path = `app`;
    let history = useHistory();
    history.push(path);
  };

  render() {
    return (
      <Main>
        <Top>
          <Brand>
            <h1 id="logo" class="d-inline">
              🥔
            </h1>
            <h1 id="company-name" class="d-inline">
              JRS
            </h1>
            <Right>
              <button id="start-btn" onClick={this.routeChange} class="btn btn-outline-light">
                Start Using Today!
              </button>
            </Right>
          </Brand>
        </Top>
      </Main>
    );
  }
}

export default AddCardModal;
