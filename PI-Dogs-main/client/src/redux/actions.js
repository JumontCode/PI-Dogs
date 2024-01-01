import axios from "axios";
// import { GET_DETAIL } from "./actions-Types";

export const GET_DOGS = "GET_DOGS";
export const GET_DETAIL  = "GET_DETAIL";

const URL = "http://localhost:3001/dogs";


export const getDogs = () => {
  return async function (dispatch) {
    const { data } = await axios.get(`${URL}s`);
    const allDogs = data;

    dispatch({ type: GET_DOGS, payload: allDogs });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const { data } = await axios(`${URL}/${id}`);

    dispatch({ type: GET_DETAIL, payload: data })
  }
}
