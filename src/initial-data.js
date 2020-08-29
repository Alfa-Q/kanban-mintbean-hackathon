// Initial data used for testing purposes
const initialData = {
  tags: {
    "🐛 Bug Tracking": { id: "🐛 Bug Tracking", color: "darkgreen", count: 2 },
    "🚀 Rocket Launch": { id: "🚀 Rocket Launch", color: "red", count: 0 },
    "👾 Video Game": { id: "👾 Video Game", color: "blue", count: 0 },
  },
  cards: {
    "card-1-1": {
      id: "card-1-1",
      tags: ["🐛 Bug Tracking", "🚀 Rocket Launch"],
      smdesc: "Hello World!",
    },
    "card-1-2": {
      id: "card-1-2",
      tags: ["🐛 Bug Tracking"],
      smdesc: "Hello World!",
    },
    "card-1-3": {
      id: "card-1-3",
      tags: ["👾 Video Game"],
      smdesc: "Beat the final boss",
    },
    "card-2-1": {
      id: "card-2-1",
      tags: ["🚀 Rocket Launch"],
      smdesc: "Card 2-1",
    },
    "card-3-1": {
      id: "card-3-1",
      tags: ["👾 Video Game"],
      smdesc: "Card 3-1",
    },
  },
  boards: {
    "board-1": {
      id: "board-1",
      name: "To-Do List",
      cards: ["card-1-1", "card-1-2", "card-1-3"],
    },
    "board-2": {
      id: "board-2",
      name: "Working On List",
      cards: ["card-2-1"],
    },
    "board-3": {
      id: "board-3",
      name: "Completed Tasks",
      cards: ["card-3-1"],
    },
  },
  boardOrder: ["board-1", "board-2", "board-3"],
};

export default initialData;
