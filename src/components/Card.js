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
  background-color: white;
`;

const TopSection = Styled.div`
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
  display: inline block;
  margin-left: auto;
  cursor: pointer;
`;

class Card extends Component {
  render() {
    console.log(`${this.props.card.id} | ${this.props.index}`);
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided) => (
          <Main {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
            <CardPin>{this.props.pinned ? "" : <img src="/icons8-pin-24.png" alt="pin" />}</CardPin>
          </Main>
        )}
      </Draggable>
    );
  }
}

export default Card;
