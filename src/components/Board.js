import React from "react";
import { Button, Dropdown } from "react-bootstrap";

// A custom dropdown menu for the board.
// Needs to be customized, otherwise dropdown menu is a button by default and
// includes a downward arrow icon which looks strange.
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    href=""
    ref={ref}
    onClick={(e) => {
      e.preDefault();
      onClick(e);
    }}
  >
    {children}
    <div className="threedots"></div>
  </div>
));

function Board(props) {
  const [isOver, setIsOver] = React.useState(false);

  const drop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);

    // Hide the card after dragging (appear invisible illusion of dragging)
    card.style.display = "block";

    // Add the card to the end of the board.
    e.target.appendChild(card);
    setIsOver(false);
  };

  const dragOver = (e) => {
    setIsOver(true);
    e.preventDefault();
    e.stopPropagation();
  };

  //const dragEnter = () => {
  //  setIsOver(true);
  //};

  const dragExit = () => {
    setIsOver(false);
  };

  return (
    <div id={props.id} className="board rounded">
      <div className="board-top">
        <div className="h4 board-name text-light">Board Name</div>
        <div className="board-dropdown">
          <Dropdown alignRight="true">
            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
            <Dropdown.Menu size="sm" title="">
              <Dropdown.Header>Options</Dropdown.Header>
              <Dropdown.Item>Edit Board</Dropdown.Item>
              {/* This can perhaps be a solution in case we cannot get boards to be draggable */}
              <Dropdown.Item>Move Board -></Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item>Clear Board</Dropdown.Item>
              <Dropdown.Item>Delete Board</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div
        className="card-container rounded"
        style={{ backgroundColor: isOver ? "#ecf284" : "#17deee" }}
        onDrop={drop}
        onDragOver={dragOver}
        //onDragEnter={dragEnter}
        onDragLeave={dragExit}
      >
        {props.children}
      </div>
      <Button variant="outline-light">+ Add Card</Button>
    </div>
  );
}

export default Board;
