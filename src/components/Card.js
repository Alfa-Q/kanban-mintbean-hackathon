import React from "react";
import { Badge } from "react-bootstrap";

function Card(props) {
  const [isDragging, setIsDragging] = React.useState(false);

  const dragStart = (e) => {
    // Required to cache event target for setTimeout function
    const target = e.target;

    setIsDragging(true);

    // Pass card ID data to the board
    e.dataTransfer.setData("card_id", target.id);

    // Make card invisible
    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const dragOver = (e) => {
    // Prevent dragging cards into cards
    e.stopPropagation();
  };

  const dragEnd = (event) => {
    setIsDragging(false);
    if (event.target.style.display === "none") {
      event.target.style.display = "block";
    }
  };

  return (
    <div
      id={props.id}
      className="card"
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDragEnd={dragEnd}
      style={{ backgroundColor: isDragging ? "grey" : "white" }}
    >
      <div className="card-top">
        {/* Tags and icon if the card is pinned would ideally go here */}
        <div className="tag-container">
          {props.tags.map((tag) => {
            return (
              <Badge variant="success" style={{ backgroundColor: tag.color }}>
                {tag.name}
              </Badge>
            );
          })}
        </div>
      </div>
      <div className="card-short-desc">{props.shortDesc}</div>
      <div className="card-pin">{props.draggable ? "" : <img src="/icons8-pin-24.png"></img>}</div>
    </div>
  );
}

export default Card;
