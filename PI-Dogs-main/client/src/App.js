import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Cards from "./Components/Cards/Cards";
import Detail from "./Components/Detail/Detail";
import Nav from "./Components/Nav/Nav";
import CreateDogForm from "./Components/NewDog/NewDog";

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/' && <Nav />}
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/dogs" element={<CreateDogForm />} />
      </Routes>
    </div>
  );
}

export default App;