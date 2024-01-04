import { GET_DOGS, GET_DETAIL, DOGS_BY_NAME,
  NEW_DOG, ORDER_DOGS_BY_NAME, ORDER_DOGS_BY_WEIGHT, 
  GET_TEMPERAMENTS, FILTER_DOGS_BY_TEMPERAMENT, FILTER_DOGS_BY_ORIGIN } from "./actions";

const initialState = {
  dogs: [],
  dogDetail: {},
  temperaments: [],
  filteredDogs: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case DOGS_BY_NAME:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          dogs: [...state.dogs, ...action.payload],
        };
      } else {
        return {
          ...state,
          dogs: [...state.dogs, action.payload],
        };
      }

    case GET_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      }

    case NEW_DOG:
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
      };

    case ORDER_DOGS_BY_NAME:
      if (action.payload === "Ascending") {
        return {
          ...state,
          dogs: [
            ...state.dogs.sort((a, b) => a.name.localeCompare(b.name)),
          ],
        };
      }
      if (action.payload === "Descending") {
        return {
          ...state,
          allDogs: [
            ...state.dogs.sort((a, b) => b.name.localeCompare(a.name)),
          ],
        };
      }
      if (action.payload === ".....") {
        return {
          ...state,
          allDogs: [...state.dogs.sort((a, b) => a.id - b.id)],
        };
      }

    case ORDER_DOGS_BY_WEIGHT:
      let sortedDogs = [...state.dogs];
      if (action.payload === "All") {
        return {
          ...state,
          dogs: [...sortedDogs.sort((a, b) => a.id - b.id)],
        };
      }
    default:
      return state;
  }
};

export default rootReducer;