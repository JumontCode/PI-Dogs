import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation /*, useNavigate*/ } from "react-router-dom";

import Cards from "./Components/Cards/Cards";

function App() {
  const [datosFromApi, setDatosFromApi] = useState([]);

  return (
    <div className="App">
      {/* <h1>Henry Dogs</h1> */}
      <Routes>
        <Route path="/" element={<Cards  />} />
      </Routes>
    </div>
  );
}

export default App;
