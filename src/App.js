import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toolbar from "./components/Toolbar";
import Board from "./components/Board";
import { DragDropContext } from "react-beautiful-dnd";

// TEMPORARY
import initialData from "./initial-data";

class App extends React.Component {
  // Test Dummy Data (See Initial Data.js file)
  state = initialData;

  handleAddCard = (card, boardId) => {
    console.log(card);
    const update = {
      ...this.state,
      // Add card to dictionary of cards
      cards: { ...this.state.cards, [card.id]: card },
      // Add card to board
      boards: {
        ...this.state.boards,
        [boardId]: {
          ...this.state.boards[boardId],
          cards: [...this.state.boards[boardId].cards, card.id],
        },
      },
    };
    console.log(this.state);
    console.log(update);
    this.setState(update);
    console.log(this.state);
  };

  handleAddBoard = (board) => {
    const updatedBoards = {
      boards: { ...this.state.boards, [board.id]: board },
      boardOrder: [...this.state.boardOrder, board.id],
    };
    this.setState(updatedBoards);
  };

  handleClearBoard = (boardId) => {
    const board = this.state.boards[boardId];
    const boardCards = board.cards.slice();
    let allCards = this.state.cards;

    boardCards.forEach((cardId) => {
      delete allCards[cardId];
      board.cards.pop();
    });

    const updatedState = {
      ...this.state,
      cards: allCards,
      boards: {
        ...this.state.boards,
        [boardId]: board,
      },
    };

    this.setState(updatedState);
  };

  handleEditBoard = (newBoardName, boardId) => {
    const boardToUpdate = this.state.boards[boardId];
    boardToUpdate.name = newBoardName;

    const updatedBoards = {
      ...this.state,
      boards: { ...this.state.boards, [boardId]: boardToUpdate },
    };
    this.setState(updatedBoards);
  };

  handleDeleteBoard = (boardId) => {
    const board = this.state.boards[boardId];
    // Remove all associated cards
    board.cards.forEach((cardId) => {
      const card = this.state.cards[cardId];
      // Update card tag total or remove if no more cards contain the tag
      card.tags.forEach((tagId) => {
        const tag = this.state.tags[tagId];
        tag.count--;
        if (tag.count === 0) {
          this.tags.delete(tagId);
        }
      });
      this.state.cards.delete(cardId);
    });
  };

  onDragStart = (result) => {
    console.log("User is dragging object ", result);
  };

  onDragEnd = (result) => {
    console.log("User has stopped dragging object ", result);

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
        {/* These two components stickied to top */}
        <Header></Header>
        <Toolbar handleAddBoard={this.handleAddBoard} onDeleteBoard={this.onDeleteBoard}></Toolbar>
        {/* The rest is unstickied */}
        <main>
          <div id="board-container">
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} sensors={[]}>
              {
                //  Generate all of the boards
                this.state.boardOrder.map((boardId) => {
                  const board = this.state.boards[boardId];
                  const cards = board.cards.map((cardId) => {
                    const card = this.state.cards[cardId];
                    const tags = card.tags.map((tagId) => this.state.tags[tagId]);
                    return { ...card, tags: tags };
                  });
                  return (
                    <Board
                      key={board.id}
                      board={board}
                      cards={cards}
                      handleAddCard={this.handleAddCard}
                      handleEditBoard={this.handleEditBoard}
                      handleClearBoard={this.handleClearBoard}
                    />
                  );
                })
              }
            </DragDropContext>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;

// TEMPORARY - FOR FORCING PINNED ITEM TO TOP
/*
function pinCardSensor(api) {
  console.log("Pin Card Sensor!");
  const preDrag = api.tryGetLock("card-1-1");
  // Could not get lock
  if (!preDrag) {
    return;
  }

  const dragActions = preDrag.snapLift();

  // Move Up Till At Top of List
  //dragActions.moveUp();
  //dragActions.moveUp();
  //dragActions.moveUp();

  //dragActions.drop();
}
*/
