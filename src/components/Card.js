import React, { Component } from "react";
import Styled from "styled-components";
import { Badge } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

import ViewCardModal from "./ViewCardModal";

const Main = Styled.div`
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  box-shadow: 1px 1px 2px;
  background-color: ${(props) => (props.isDragging ? "lightgrey" : "white")};
`;

const TopSection = Styled.div`
  display: block;
  word-wrap: break-word;
  white-space: nowrap;
  white-space: initial;
`;

const BottomSection = Styled.div`
  display: block;
`;

const TagContainer = Styled.div`
  display: block;
  margin-right: 4px;
  color: white;
  > span {
    margin-right: 8px;
  }
`;

const CardPin = Styled.div`
  display: inline-block;
  float: right;
  cursor: pointer;
`;

const DueDate = Styled.div`
  display: inline-block;
  color; red;
  opacity: 50%;
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCardModal: false,
    };
  }

  handleDoubleClick = () => {
    console.log("Showing Card Modal");
    this.setState({ viewCardModal: true });
  };

  handleCloseModal = () => {
    console.log("Hiding the Modal");
    this.setState({ viewCardModal: false });
  };

  render() {
    return (
      <Draggable
        draggableId={this.props.card.id}
        index={this.props.index}
        isDragDisabled={this.props.card.pinned}
      >
        {(provided, snapshot) => (
          <Main
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onDoubleClick={this.handleDoubleClick}
          >
            <TopSection>
              <TagContainer>
                {this.props.card.tags.map((tag) => (
                  <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
                    {tag.name}
                  </Badge>
                ))}
              </TagContainer>
              {this.props.card.name}
            </TopSection>
            <BottomSection>
              <DueDate>
                <span role="img" aria-label="due" data-placement="top" title="Tooltip on top">
                  🕒
                </span>{" "}
                {new Date(this.props.card.due).toLocaleDateString()} |{" "}
                {new Date(this.props.card.due).toLocaleTimeString()}
              </DueDate>
              <CardPin>
                {this.props.card.pinned ? (
                  <img src="/icons8-pin-24.png" alt="pin" />
                ) : (
                  <img src="/icons8-pin-outline-24.png" alt="unpinned" />
                )}
              </CardPin>
            </BottomSection>
            <ViewCardModal
              show={this.state.viewCardModal}
              onHide={this.handleCloseModal}
              handleUpdateCard={this.props.handleUpdateCard}
              handleDeleteCard={this.props.handleDeleteCard}
              boardId={this.props.boardId}
              card={this.props.card}
            ></ViewCardModal>
          </Main>
        )}
      </Draggable>
    );
  }
}

export default Card;
