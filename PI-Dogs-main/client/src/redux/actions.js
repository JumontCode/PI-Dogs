import axios from "axios";

export const NEW_DOG = "NEW_DOG";
export const GET_DOGS = "GET_DOGS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const DOGS_BY_NAME = "DOGS_BY_NAME";

export const FILTER_DOGS_BY_TEMPERAMENT = "FILTER_DOGS_BY_TEMPERAMENT";
export const FILTER_DOGS_BY_ORIGIN = "FILTER_DOGS_BY_ORIGIN";
export const ORDER_DOGS_BY_NAME = "ORDER_DOGS_BY_NAME";
export const ORDER_DOGS_BY_WEIGHT = "ORDER_DOGS_BY_WEIGHT";


const URL = "http://localhost:3001/dogs";


export const getDogs = () => {
  return async function (dispatch) {
    const { data } = await axios.get(`${URL}s`);

    dispatch({ type: GET_DOGS, payload: data });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const { data } = await axios(`${URL}/${id}`);

    dispatch({ type: GET_DETAIL, payload: data })
  }
}

export const postDog = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(URL, payload);
      return dispatch({
        type: NEW_DOG,
        payload: data,
      });
    } catch (error) {
      console.error("Error creating new dog", error.message);
    }
  }
}

export const orderDogsByName = (payload) => {
  return {
    type: ORDER_DOGS_BY_NAME,
    payload,
  };
};

export const orderDogsByWeight = (payload) => {
  return {
    type: ORDER_DOGS_BY_WEIGHT,
    payload,
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    const endpoint = `${URL}/temperaments`;
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      console.error("Error getting temperaments:", error);
    }
  };
}

export const filterDogsByTemperament = (temp) => {
  return {
    type: FILTER_DOGS_BY_TEMPERAMENT,
    payload: temp,
  };
}

export const filterDogsByOrigin = (origin) => {
  return {
    type: FILTER_DOGS_BY_ORIGIN,
    payload: origin,
  };
}

export const findDogByName = (id) => {
  return async (dispatch, getState) => {
    const dogs = getState().dogs; // Obtén la lista actual de perros desde el estado

    const endPoint = `http://localhost:3001/dogs`;

    try {
      if (Number(id)) {
        const { data } = await axios(`${endPoint}/${id}`);

        if (data.name) {
          if (!dogs.find((dog) => dog.id === data.id)) {
            dispatch({
              type: DOGS_BY_NAME,
              payload: data,
            });
          } else {
            alert(`¡YA EXISTE UN PERRO CON EL ID: ${id}!`);
          }
        } else {
          alert(`NO EXISTEN PERROS CON EL ID: ${id}`);
        }
      } else {
        const { data } = await axios(`${endPoint}/?name=${id}`);

        let dogsToAdd = [];
        if (data.length > 0) {
          data.forEach((dog) => {
            if (!dogs.find((existingDog) => existingDog.id === dog.id)) {
              dogsToAdd.push(dog);
            }
          });

          if (dogsToAdd.length > 0) {
            dispatch({
              type: DOGS_BY_NAME,
              payload: dogsToAdd,
            });
          } else {
            const name = id.toUpperCase();
            alert(`Todos los perros de la raza "${name}" ya están en la lista.`);
          }
        } else {
          alert(`NO EXISTEN PERROS CON EL NOMBRE: ${id}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};