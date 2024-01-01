import { GET_DOGS, GET_DETAIL } from "./actions";

const initialState = {
    dogs: [],
    dogDetail: {},
    newDog: {},
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

      case GET_DETAIL:
            return{
                ...state,
                dogDetail: action.payload,
            }
    default:
        return state;
    }
  };
  
  export default rootReducer;