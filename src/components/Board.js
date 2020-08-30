import React, { Component } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import AddCardModal from "./AddCardModal";
import EditBoardModal from "./EditBoardModal";

const Main = Styled.div`
  display: inline-flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 400px;
  background-color: #10aeb2;
  padding: 16px;
  margin-right: 16px;
  margin-bottom: 8px;
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
  transition: background-color 0.4s ease;
  background-color: ${(props) => (props.isDraggingOver ? "#ecf284" : "#17deee")};
`;

const BottomSection = Styled.div`
  display: block;
`;

const AddButton = Styled.div`
  background-color: "#043334";
  color: white;
`;

// A custom dropdown menu for the board (three vertical dots).
// Needs to be customized, otherwise dropdown menu is a button by default and
// includes a downward arrow icon which looks strange.
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    href=""
    ref={ref}
    onClick={(e) => {
      console.log(e);
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <div className="threedots"></div>
  </div>
));

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#ecf284" : "#17deee",
});

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editBoardModalShow: false,
      addCardModalShow: false,
    };
  }

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
                <Dropdown.Item onClick={() => this.setState({ editBoardModalShow: true })}>
                  Edit Board
                </Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={() => this.props.handleClearBoard(this.props.board.id)}>
                  Clear Board
                </Dropdown.Item>
                <Dropdown.Item /*onClick={}*/>Delete Board</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </DropdownList>
        </TopSection>
        <Droppable droppableId={this.props.board.id}>
          {(provided, snapshot) => (
            <CardContainer
              className="rounded"
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </CardContainer>
          )}
        </Droppable>
        <BottomSection>
          <AddButton>
            <Button onClick={() => this.setState({ addCardModalShow: true })}>+</Button>
          </AddButton>
        </BottomSection>
        <EditBoardModal
          show={this.state.editBoardModalShow}
          boardId={this.props.board.id}
          boardName={this.props.board.name}
          handleEditBoard={this.props.handleEditBoard}
          onHide={() => this.setState({ editBoardModalShow: false })}
        />
        <AddCardModal
          show={this.state.addCardModalShow}
          boardId={this.props.board.id}
          handleAddCard={this.props.handleAddCard}
          onHide={() => this.setState({ addCardModalShow: false })}
        />
      </Main>
    );
  }
}

export default Board;
