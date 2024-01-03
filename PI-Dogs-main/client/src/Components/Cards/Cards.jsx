import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import styles from "./cards.module.css";

export const Cards = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("ascendente");

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  if (!Array.isArray(dogs) || dogs.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dogs.slice(indexOfFirstItem, indexOfLastItem);

  const sortedDogs = [...dogs].sort((a, b) => {
    const sortOrder = sortType === "ascendente" ? 1 : -1;
    return sortOrder * a.name.localeCompare(b.name);
  });
  
  const items = sortedDogs.slice(indexOfFirstItem, indexOfLastItem).map((dog) => {
    return (
      <Card
        key={dog.id}
        id={dog.id}
        name={dog.name}
        image={dog.image}
        weight={dog.weight}
        temperaments={dog.temperaments}
      />
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dogs.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSortType = () => {
    setSortType((prevSortType) =>
      prevSortType === "ascendente" ? "descendente" : "ascendente"
    );
  };

  return (
    <div>
      <div className={styles.cardsContainer}>
        <>{items}</>
      </div>

      <div className={styles.btnContainer}>
        <button onClick={toggleSortType}>
          Orden: {sortType === "ascendente" ? "A-Z" : "Z-A"}
        </button>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => handlePageChange(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cards;