import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation /*, useNavigate*/ } from "react-router-dom";

import Cards from "./Components/Cards/Cards";
import Detail from "./Components/Detail/Detail";
import Nav from "./Components/Nav/Nav";

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
      setDogs([...nextPageData]);
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


//   const onSearch = async (id) => {
//     const endPoint = `http://localhost:3001/dogs`;

//     try {
//       if (Number(id)) {
//           const { data } = await axios(`${endPoint}/${id}`);
          
//           if (data.name) {
//               if (!dogs.find((dog) => dog.id === data.id)) {
//                   setDogs((dogs) => [...dogs, data]);
//               } else {
//                   alert(`¡YA EXISTE UN PERRO CON EL ID: ${id}!`);
//               }
//           } else {
//               alert(`NO EXISTEN PERROS CON EL ID: ${id}`);
//           }
//       } else {
//           const { data } = await axios(`${endPoint}/?name=${id}`);
//           if (data.length > 0) {
              
//               setDogs((dogs) => [...dogs, ...data]);
//           } else {
//               alert(`NO EXISTEN PERROS CON EL NOMBRE: ${id}`);
//           }
//       }
//     } catch (error) {
//         console.error(error);
//     }
// };

const onSearch = async (id) => {
  const endPoint = `http://localhost:3001/dogs`;

  try {
    if (Number(id)) {
      const { data } = await axios(`${endPoint}/${id}`);
      console.log('respuesta del server', data);
      if (data.name) {
        if (!dogs.find((dog) => dog.id === data.id)) {
          const updatedDogs = [...dogs, data];
          const totalElements = updatedDogs.length;

          // Verificar si se excede el límite actual de elementos por página
          if (totalElements > (currentPage + 1) * itemsPerPage) {
            const newPage = Math.floor(totalElements / itemsPerPage);
            setDogs(updatedDogs.slice(newPage * itemsPerPage, (newPage + 1) * itemsPerPage));
            setcurrentPage(newPage);
          } else {
            setDogs(updatedDogs);
          }
        } else {
          alert(`¡YA EXISTE UN PERRO CON EL ID: ${id}!`);
        }
      } else {
        alert(`NO EXISTEN PERROS CON EL ID: ${id}`);
      }
    } else {
      const { data } = await axios(`${endPoint}/?name=${id}`);
      if (data.length > 0) {
        const updatedDogs = [...dogs, ...data];
        const totalElements = updatedDogs.length;

        // Verificar si se excede el límite actual de elementos por página
        if (totalElements > (currentPage + 1) * itemsPerPage) {
          const newPage = Math.floor(totalElements / itemsPerPage);
          setDogs(updatedDogs.slice(newPage * itemsPerPage, (newPage + 1) * itemsPerPage));
          setcurrentPage(newPage);
        } else {
          setDogs(updatedDogs);
        }
      } else {
        alert(`NO EXISTEN PERROS CON EL NOMBRE: ${id}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="App">
      {location.pathname === '/' && <Nav onSearch={onSearch} />}
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
            <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
