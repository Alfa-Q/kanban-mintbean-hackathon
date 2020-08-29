import React, { Component } from "react";
import Styled from "styled-components";
import { Badge } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

const Main = Styled.div`
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
  box-shadow: 1px 1px 2px;
  background-color: ${(props) => (props.isDragging ? "lightgrey" : "white")};
`;

const TopSection = Styled.div`
  display: block;
`;

const BottomSection = Styled.div`
  display: block;
`;

const TagContainer = Styled.div`
  display: inline-block;
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
  render() {
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Main
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <TopSection>
              <TagContainer>
                {this.props.card.tags.map((tag) => (
                  <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
                    {tag.id}
                  </Badge>
                ))}
              </TagContainer>
            </TopSection>
            {this.props.card.smdesc}
            <BottomSection>
              <DueDate>
                <span role="img" aria-label="due">
                  🕒
                </span>{" "}
                {new Date(this.props.date).toDateString()}
              </DueDate>
              <CardPin>
                {this.props.card.pinned ? (
                  <img src="/icons8-pin-24.png" alt="pin" />
                ) : (
                  <img src="/icons8-pin-outline-24.png" alt="unpinned" />
                )}
              </CardPin>
            </BottomSection>
          </Main>
        )}
      </Draggable>
    );
  }
}

export default Card;
