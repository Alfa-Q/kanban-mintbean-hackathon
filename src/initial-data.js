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
      name: "Hello World!",
      due: "12 Dec 2010 12:00:00 GMT",
      desc: "This is a test.",
      pinned: false,
    },
    "card-1-2": {
      id: "card-1-2",
      tags: ["🐛 Bug Tracking"],
      name: "Hello World!",
      due: "14 Dec 2011 12:00:00 GMT",
      pinned: true,
      desc: "This is a test.",
    },
    "card-1-3": {
      id: "card-1-3",
      tags: ["👾 Video Game"],
      name: "Beat the final boss",
      due: "01 Feb 2015 12:00:00 GMT",
      pinned: false,
      desc: "This is a test.",
    },
    "card-2-1": {
      id: "card-2-1",
      tags: ["🚀 Rocket Launch"],
      name: "Card 2-1",
      due: "01 Jan 2010 12:00:00 GMT",
      pinned: false,
      desc: "This is a test.",
    },
    "card-3-1": {
      id: "card-3-1",
      tags: ["👾 Video Game"],
      name: "Card 3-1",
      due: "01 Jan 1970 00:00:00 GMT",
      pinned: false,
      desc: "This is a test.",
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
