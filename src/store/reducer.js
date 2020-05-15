const initialState = {
  user: {
    name: "Helva",
    likes: [161235, 67283],
  },
  pizzas: [
    {
      id: 161235,
      name: "Pizza Margherita",
      description:
        "The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.",
      bought: 5,
    },
    {
      id: 67283,
      name: "Pizza Napoletana",
      description:
        "Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",
      bought: 2,
    },
    {
      id: 357311,
      name: "Pizza Bianca",
      description:
        "White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.",
      bought: 10,
    },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PIZZA": {
      // 3. (steps 1-2 in AddPizzaForm.js) handle reaction in reducer and then there's a new state
      // use this console.log often:
      console.log("STATE:", state, "ACTION:", action);
      // => Ask yourself: what is action.payload?
      return {
        // state.push(action.payload): not allowed because it's a mutation!
        ...state, // copying and keeping the same user data
        pizzas: [
          ...state.pizzas, // copying and keeping the other pizza data
          {
            id: state.pizzas.length, // adding new pizza. action.payload.id
            name: action.payload.name,
            description: action.payload.description,
            bought: 0,
          },
        ],
      };
    }
    case "LIKE_PIZZA": {
      if (state.user.likes.includes(action.payload)) {
        const newLikes = state.user.likes.filter((id) => {
          return id !== action.payload;
        });
        return { ...state, user: { ...state.user, likes: newLikes } };
      } else {
        return {
          ...state,
          user: { ...state.user, likes: [...state.user.likes, action.payload] }, // keep or override data?
        };
      }
    }
    default: {
      return state;
    }
  }
}
