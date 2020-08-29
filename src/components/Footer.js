import React from "react";
import { Navbar } from "react-bootstrap";

function Footer(props) {
  return (
    <Navbar id="footer" bg="secondary" variant="light">
      Created by Josh Matsushima, Ryan Mileris, Scott Krysten
      <div className="ml-auto">
        <img src="../../icons8-github-60.png" alt="Github logo" />
      </div>
    </Navbar>
  );
}

export default Footer;
