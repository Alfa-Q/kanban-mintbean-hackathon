// Initial Board State (Required by Hackathon Rules)
const defaultState = {
  tags: {},
  cards: {},
  boards: {
    "to-do": {
      id: "to-do",
      name: "To Do",
      cards: [],
    },
    "in-progress": {
      id: "in-progress",
      name: "In Progress",
      cards: [],
    },
    done: {
      id: "done",
      name: "Done",
      cards: [],
    },
  },
  boardOrder: ["to-do", "in-progress", "done"],
};

export default defaultState;
