import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";
import Card from "./components/Card";
import Toolbar from "./components/Toolbar";
import { Container, Row, Col } from "react-bootstrap";
import { AppProvider } from "./AppContext";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [boards, setBoards] = React.useState(["board 1", "board 2"]);
  const addBoard = (boardName) =>
    setBoards(() => {
      boards.concat([boardName]);
      console.log(`Added new Board "${boardName}"`);
    });

  return (
    <div className="App">
      <Header></Header>
      <main>
        <AppProvider value={{ boards, addBoard }}>
          <Toolbar></Toolbar>
          <Container fluid id="board-container">
            <Row>
              <Col>
                <Board>
                  <Card
                    id="card-1"
                    draggable={false}
                    tags={[
                      { name: "🐛 Bug Fix", color: "green" },
                      { name: "🚀 Rocket Ship", color: "red" },
                    ]}
                    shortDesc="Fix the rocket ship engine software before we launch."
                  ></Card>
                  <Card
                    id="card-2"
                    draggable={true}
                    tags={[
                      { name: "🐛 Bug Fix", color: "green" },
                      { name: "👾 Fix Final Boss", color: "blue" },
                    ]}
                    shortDesc="Card Number Two!"
                  ></Card>
                  <Card
                    id="card-3"
                    draggable={true}
                    tags={[]}
                    shortDesc="Card Number Three!"
                  ></Card>
                </Board>
              </Col>
              <Col>
                <Board>
                  <Card id="card-4" draggable={true} tags={[]} shortDesc="Card Number Four!"></Card>
                </Board>
              </Col>
              <Col>
                <Board>
                  <Card
                    id="card-5"
                    draggable={true}
                    tags={[]}
                    shortDesc="Card Number Five!!!!!!!!!"
                  ></Card>
                </Board>
              </Col>
            </Row>
          </Container>
        </AppProvider>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
