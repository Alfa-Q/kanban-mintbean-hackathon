# kanban-mintbean-hackathon
Kanban project for the Mintbean JS Bootcamp Olympics 2020 Hackathon from 08/29/2020 - 08/31/2020

🎖️ Awarded an Honorable Mention!

Information about the challenge can be viewed here on the official page: https://sites.google.com/mintbean.io/javascriptbootcampolympics/home

## Features
- Drag and drop cards and boards
- Drag and drop cards in a board to another board
- Edit, create, delete cards and boards
- Add unlimited number of tags and remove tags
- Tags include an emoji from a emoji picker and user can select a custom tag color
- Export and Import your boards and cards as a .JSON file
- Option to clear all cards on a board without deleting the board itself

## Known Issues / Missing Features
- Can only have two tags initially when creating a new card (but can add more via Edit after a card is created)
- Cannot create a card without any tags
- Options > Settings does not do anything
- Dragging a board causes the other boards to be pushed down ([possible bug in react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/issues/1833))
- Missing confirmation popups for destructive actions (like deleting a card, clearing a board, or deleting a board).
- Missing conversion from .JSON to .CSV file
- Cannot click on textboxes in the Date Time, Color, and Emoji picker.

## Contributors
Name            | Github
--------------- | --------------------------
Josh Matsushima | https://github.com/Alfa-Q
Ryan Mileris    | https://github.com/TheBananasToTheWallHost
Scott Krysten   | https://github.com/krvnu

This project was developed in VS Code using Microsoft's [live share add-on](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) (which is why all commits were only made by one person).  It was very helpful as a sort of pair programming / side-by-side programming tool, as most of us in the group have never used React.js before!

## Check Out the Site!
https://alfa-q.github.io/kanban-mintbean-hackathon/
