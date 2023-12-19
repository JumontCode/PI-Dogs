import axios from "axios";

export const GET_DOGS = "GET_DOGS";

const URL = "http://localhost:3001/dogss/";

export const getDogs = () => {
  return async function (dispatch) {
    const {data} = await axios.get(`${URL}`);
    const allDogs = data;

    dispatch({ type: GET_DOGS, payload: allDogs });
  };
};