import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Styled from "styled-components";

const Wrapper = Styled.div`
  color: white;
  margin: 0px;

  margin: 0 auto -155px;
`;

function Footer(props) {
  return (
    <Wrapper>
      <Navbar bg="secondary" variant="light">
        Created by Josh Matsushima, Ryan Mileris, Scott Krysten
        <div className="ml-auto">
          <img src="../../icons8-github-60.png" alt="Github logo" />
        </div>
      </Navbar>
    </Wrapper>
  );
}

export default Footer;
