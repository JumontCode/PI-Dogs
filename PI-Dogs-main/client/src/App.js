import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation /*, useNavigate*/ } from "react-router-dom";

import Cards from "./Components/Cards/Cards";
// import { getDogs } from "../../redux/actions";

function App() {
  const itemsPerPage = 8;

  const [datosFromApi, setDatosFromApi] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);

  const location = useLocation();

  const dogsAll = async () => {
    try {
      const { data } = await axios("http://localhost:3001/dogss");

      if (data) {
        setDatosFromApi(data);

        const initialPageData = data.slice(0, itemsPerPage);
        setDogs(initialPageData)
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  useEffect(() => {
    dogsAll();
  }, []);

  const nextHandler = () => {
    const totalElementos = datosFromApi.length;

    const nextPage = currentPage + 1;

    const firstIndex = nextPage * itemsPerPage;

    if (firstIndex < totalElementos) {
      const nextPageData = datosFromApi.slice(firstIndex, firstIndex + itemsPerPage)
      setDogs(nextPageData);
      setcurrentPage(nextPage);
    }
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;

    if (prevPage < 0) return;

    const firstIndex = prevPage * itemsPerPage;

    setDogs([...datosFromApi].splice(firstIndex, itemsPerPage));
    setcurrentPage(prevPage);
  };

  // const onSearch = async (id) => {
  //   const endPoint = `http://localhost:3001/dogs/`;

  //   if (Number(id)) {
  //     alert("Por favor ingrese un NOMBRE o un ID correcto.");

  //     try {
  //       const { data } = await axios(`${endPoint}${id}`);
  //       if (data.name) {
  //         const dogExists = dogs.find((dog) => dog.id === data.id)
  //         if (!dogExists) {
  //           setDogs((dogs) => [...dogs, data]);
  //         } else if (dogExists) {
  //           alert(`¡YA EXISTE UN PERSONAJE CON EL ID: ${id}!`);
  //         } else {
  //           alert(`No EXISTEN PERSONAJES CON ${id}`);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // }

  return (
    <div className="App">
      {/* <h1>Henry Dogs</h1> */}
      <Routes>
        <Route
          path="/"
          element={
            <Cards 
              dogs={dogs}
              currentPage={currentPage}
              nextHandler={nextHandler}
              prevHandler={prevHandler}
            />} />
      </Routes>
    </div>
  );
}

export default App;
