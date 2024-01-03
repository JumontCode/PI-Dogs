// import axios from "axios";
// import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation /*, useNavigate*/ } from "react-router-dom";

import Cards from "./Components/Cards/Cards";
import Detail from "./Components/Detail/Detail";
import Nav from "./Components/Nav/Nav";

function App() {

  // const itemsPerPage = 8;
  // const [datosFromApi, setDatosFromApi] = useState([]);
  // const [dogs, setDogs] = useState([]);
  // const [currentPage, setcurrentPage] = useState(0);

  const location = useLocation();

  // const dogsAll = async () => {
  //   try {
  //     const { data } = await axios("http://localhost:3001/dogss");

  //     if (data) {
  //       setDatosFromApi(data);
  //       setDogs(data)
  //     }
  //   } catch (error) {
  //     console.log({ error: error.message });
  //   }
  // };

  // useEffect(() => {
  //   dogsAll();
  // }, []);

  // const onSearch = async (id) => {
  //   const endPoint = `http://localhost:3001/dogs`;

  //   try {
  //     if (Number(id)) {
  //       const { data } = await axios(`${endPoint}/${id}`);

  //       if (data.name) {
  //         if (!dogs.find((dog) => dog.id === data.id)) {
  //           setDogs((dogs) => [...dogs, data]);
  //         } else {
  //           alert(`¡YA EXISTE UN PERRO CON EL ID: ${id}!`);
  //         }
  //       } else {
  //         alert(`NO EXISTEN PERROS CON EL ID: ${id}`);
  //       }
  //     } else {
  //       const { data } = await axios(`${endPoint}/?name=${id}`);

  //       let dogsToAdd = [];
  //       if (data.length > 0) {
  //         data.forEach((dog) => {
  //           if (!dogs.find((existingDog) => existingDog.id === dog.id)) {
  //             dogsToAdd.push(dog);
  //             // setDogs((prevDogs) => [...prevDogs, dog]);
  //           }
  //         })
  //       }

  //       if (dogsToAdd.length > 0) {
  //         setDogs((prevDogs) => [...prevDogs, ...dogsToAdd]);
  //       } else {
  //         const name = id.toUpperCase();
  //         // En caso contrario, puedes mostrar otro mensaje si lo necesitas
  //         alert(`Todos los perros de la raza "${name}" ya están en la lista.`);
  //       }

  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="App">
      {location.pathname === '/' && <Nav />}
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;