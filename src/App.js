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
  // state = React.setState(initialData);

  // TODO: Move drag drop to its own component
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // User dropped card on non-droppable location
    if (!destination) {
      return;
    }

    // User dropped card to original location
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startBoard = this.state.boards[source.droppableId];
    const endBoard = this.state.boards[destination.droppableId];

    // Dragging within the same board
    if (startBoard === endBoard) {
      // Remove card from old location and update to new
      const newCardIds = Array.from(startBoard.cards);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const updatedBoard = {
        ...startBoard,
        cards: newCardIds,
      };

      const updatedState = {
        ...this.state,
        boards: {
          ...this.state.boards,
          [updatedBoard.id]: updatedBoard,
        },
      };

      this.setState(updatedState);
    }
    // Dragging to a different board
    else {
      const startBoardCardIds = Array.from(startBoard.cards);
      startBoardCardIds.splice(source.index, 1);
      const updatedStartBoard = {
        ...startBoard,
        cards: startBoardCardIds,
      };

      const endBoardCardIds = Array.from(endBoard.cards);
      endBoardCardIds.splice(destination.index, 0, draggableId);
      const updatedEndBoard = {
        ...endBoard,
        cards: endBoardCardIds,
      };

      const updatedState = {
        ...this.state,
        boards: {
          ...this.state.boards,
          [updatedStartBoard.id]: updatedStartBoard,
          [updatedEndBoard.id]: updatedEndBoard,
        },
      };

      this.setState(updatedState);
    }
  };

  render() {
    return (
      <div>
        <Header></Header>
        <main>
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
