export const initialStore = () => {
  return {
    message: null,
    currentCharacter: {},
    currentPlanet: {},
    currentStarship: {},
    favorites: [],

    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "character_details":
      return { ...store, currentCharacter: action.payload }


    case "planet_details":
      return { ...store, currentPlanet: action.payload }

    case "starship_details":
      return { ...store, currentStarship: action.payload }

    case "add_favorite":
      return { ...store, favorites: [...store.favorites, action.payload] }

    case "remove_favorite":
      return { 
        ...store,  // ← AQUÍ FALTABA LA COMA
        favorites: store.favorites.filter(fav => fav.uid !== action.payload.uid) 
      }

    case "add_task":
      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      }

    default:
      throw Error("Unknown action.")
  }
}