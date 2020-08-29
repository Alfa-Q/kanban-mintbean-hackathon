import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toolbar from "./components/Toolbar";
import Board from "./components/Board";
import { AppProvider } from "./AppContext";
import { DragDropContext } from "react-beautiful-dnd";

// TEMPORARY
import initialData from "./initial-data";

class App extends React.Component {
  // Test Dummy Data (See Initial Data.js file)
  state = initialData;

  // TODO: Move drag drop to own component
  // Order the board
  onDragEnd = (result) => {};

  render() {
    return (
      <div>
        <Header></Header>
        <main>
          {console.log("Test")}
          <Toolbar></Toolbar>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {
              //  Generate all of the boards
              this.state.boardOrder.map((boardId) => {
                const board = this.state.boards[boardId];
                const cards = board.cards.map((cardId) => {
                  const card = this.state.cards[cardId];
                  const tags = card.tags.map((tagId) => this.state.tags[tagId]);
                  return { ...card, tags: tags };
                });
                console.log(cards);
                return <Board key={board.id} board={board} cards={cards} />;
              })
            }
          </DragDropContext>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
