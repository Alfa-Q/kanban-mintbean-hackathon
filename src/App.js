import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";
import ModalContainer from "./components/ModalContainer";

// TEMPORARY
import defaultState from "./default-state";

class App extends React.Component {
  constructor() {
    super();
    try {
      let storedState = localStorage.getItem("kanban-state");
      storedState = storedState === null ? null : JSON.parse(storedState);
      this.state = storedState || defaultState;
    } catch (error) {
      console.log("Got Bad Data!  Resorting to Default State");
      this.state = defaultState;
    }
  }

  handleResetKanban = () => {
    // Update local storage
    localStorage.setItem("kanban-state", JSON.stringify(defaultState));
    // Modify current state
    this.setState(defaultState);
  };

  // ==============================================
  // CARD UPDATES
  // ==============================================
  handleAddCard = (card, boardId) => {
    console.log("\n", `Adding card to board ${boardId}`);
    let updatedTags = { ...this.state.tags };
    for (const tag of card.tags) {
      updatedTags = { ...updatedTags, [tag.id]: tag };
    }

    // Normalize Card Tag Array
    card.tags = card.tags.map((tag) => tag.id);

    const update = {
      ...this.state,
      tags: updatedTags,
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

    this.setState(update, () => {
      console.log("Saved New Card!");
      localStorage.setItem("kanban-state", JSON.stringify(this.state));
    });
  };

  handleUpdateCard = (card, boardId) => {
    console.log("\n", `Adding card to board ${boardId}`);
    let updatedTags = { ...this.state.tags };
    for (const tag of card.tags) {
      updatedTags = { ...updatedTags, [tag.id]: tag };
    }
    console.log(card);

    // Normalize Card Tag Array
    card.tags = card.tags.map((tag) => tag.id);

    const update = {
      ...this.state,
      tags: updatedTags,
      // Add card to dictionary of cards
      cards: { ...this.state.cards, [card.id]: card },
    };

    this.setState(update, () => {
      console.log("Saved New Card!");
      localStorage.setItem("kanban-state", JSON.stringify(this.state));
    });

    /*
    const updatedState = {
      cards: {
        ...this.state.cards,
        [card.id]: card,
      },
    };
    console.log(card);
    this.setState(updatedState);
    console.log(this.state);
    */
  };

  handleDeleteCard = (card, boardId) => {
    let allCards = this.state.cards;
    delete allCards[card.id];

    let board = this.state.boards[boardId];
    let cardIndex = board.cards.findIndex((cardID) => cardID === card.id);
    board.cards.splice(cardIndex, 1);

    const updatedState = {
      cards: allCards,
      boards: {
        ...this.state.boards,
        [board.id]: board,
      },
    };

    this.setState(updatedState, () => {
      console.log("Saved New Board!");
      localStorage.setItem("kanban-state", JSON.stringify(this.state));
    });
  };

  // ==============================================
  // BOARD UPDATES
  // ==============================================
  handleAddBoard = (board) => {
    const updatedBoards = {
      boards: { ...this.state.boards, [board.id]: board },
      boardOrder: [...this.state.boardOrder, board.id],
    };
    this.setState(updatedBoards, () => {
      console.log("Saved New Board!");
      localStorage.setItem("kanban-state", JSON.stringify(this.state));
    });
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

    this.setState(updatedState, () => {
      console.log("Saved Board Clear!");
      localStorage.setItem("kanban-state", JSON.stringify(this.state));
    });
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
    const boardCards = board.cards.slice();
    let allCards = this.state.cards;

    boardCards.forEach((cardId) => {
      delete allCards[cardId];
      board.cards.pop();
    });

    const boards = this.state.boards;
    delete boards[boardId];

    const boardOrder = this.state.boardOrder;
    let boardOrderIndex = boardOrder.findIndex((boardID) => boardID === boardId);
    boardOrder.splice(boardOrderIndex, 1);

    const updatedState = {
      ...this.state,
      cards: allCards,
      boards: {
        boards,
      },
      boardOrder: boardOrder,
    };

    console.log(updatedState);

    this.setState(updatedState, () => {
      console.log("Saved Board Clear!");
      localStorage.setItem("kanban-state", JSON.stringify(this.state));
    });
  };

  // ==============================================
  // DRAG UPDATES
  // ==============================================
  onDragStart = (result) => {
    console.log("User is dragging object ", result);
  };

  onDragEndBoard = (source, destination, draggableId) => {
    // Insert board into new location of array
    const newBoardOrder = Array.from(this.state.boardOrder);
    newBoardOrder.splice(source.index, 1);
    newBoardOrder.splice(destination.index, 0, draggableId);

    // New state after board dropped
    const newState = {
      ...this.state,
      boardOrder: newBoardOrder,
    };

    this.setState(newState, () => {
      console.log("Saved Changes to Board Position!");
      localStorage.setItem("kanban-state", JSON.stringify(this.state));
    });

    console.log(this.state);
  };

  onDragEndCard = (source, destination, draggableId) => {
    const startBoard = this.state.boards[source.droppableId];
    const endBoard = this.state.boards[destination.droppableId];

    // User dragged and dropped to original board
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

      this.setState(updatedState, () => {
        console.log("Saved Changes to Card Position!");
        localStorage.setItem("kanban-state", JSON.stringify(this.state));
      });
    }
    // User dragged and dropped to new board
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

      this.setState(updatedState, () => {
        console.log("Saved Changes to Card Position!");
        localStorage.setItem("kanban-state", JSON.stringify(this.state));
      });
    }
  };

  onDragEnd = (result) => {
    console.log("User has stopped dragging object ", result);
    const { source, destination, draggableId, type } = result;

    // User dropped card on non-droppable location
    if (!destination) {
      return;
    }

    // User dropped card to original location
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // User dragged and dropped a board
    if (type === "board") {
      this.onDragEndBoard(source, destination, draggableId);
    }

    // User dragged and dropped a card
    if (type === "card") {
      this.onDragEndCard(source, destination, draggableId);
    }
  };

  render() {
    return (
      <div>
        {/* These two components stickied to top */}
        <Header
          handleAddBoard={this.handleAddBoard}
          handleResetKanban={this.handleResetKanban}
        ></Header>
        {/* The rest is unstickied */}
        <main>
          <div
            id="board-container"
            style={{
              background: "black",
              overflowX: "auto !important",
              paddingLeft: "32px",
            }}
          >
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
              <Droppable droppableId="board-container" type="board" direction="horizontal">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {
                      //  Generate all of the boards
                      this.state.boardOrder.map((boardId, index) => {
                        console.log("\n", this.state);
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
                            handleDeleteBoard={this.handleDeleteBoard}
                            handleUpdateCard={this.handleUpdateCard}
                            handleDeleteCard={this.handleDeleteCard}
                            index={index}
                          />
                        );
                      })
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </main>
        <ModalContainer handleClearBoard={this.handleClearBoard}></ModalContainer>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
