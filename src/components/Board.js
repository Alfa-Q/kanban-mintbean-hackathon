import React, { Component } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

const Main = Styled.div`
  display: inline-flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 400px;
  background-color: #10aeb2;
  padding: 16px;
  margin-left: 8px;
  box-shadow: 2px 2px 4px;
`;

const TopSection = Styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const Title = Styled.h4`
  margin-top: 4px;
  display: inline-block;
  margin-right: auto;
  vertical-align: middle;
`;

const DropdownList = Styled.div`
  display: inline-block;
`;

const CardContainer = Styled.div`
  justify-content: space-between;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  margin-bottom: 8px;
  min-height: 64px;
  background-color: #ecf284;
`;

// A custom dropdown menu for the board.
// Needs to be customized, otherwise dropdown menu is a button by default and
// includes a downward arrow icon which looks strange.
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <div class="threedots"></div>
  </div>
));

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#ecf284" : "#17deee",
});

class Board extends Component {
  render() {
    return (
      <Main className="rounded">
        <TopSection>
          <Title className="h4 text-light">{this.props.board.name}</Title>
          <DropdownList>
            <Dropdown alignRight={true}>
              <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
              <Dropdown.Menu size="sm" title="">
                <Dropdown.Header>Options</Dropdown.Header>
                <Dropdown.Item>Edit Board</Dropdown.Item>
                {/* This can perhaps be a solution in case we cannot get boards to be draggable */}
                <Dropdown.Item>Move Board</Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item>Clear Board</Dropdown.Item>
                <Dropdown.Item>Delete Board</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </DropdownList>
        </TopSection>
        <Droppable droppableId={this.props.board.id}>
          {(provided) => (
            <CardContainer className="rounded" ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </CardContainer>
          )}
        </Droppable>
      </Main>
    );
  }
}

export default Board;
