import { useEffect } from "react";
import { Card } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import styles from "./cards.module.css";

export const Cards = ({ dogs, nextHandler, prevHandler }) => {

  if (!Array.isArray(dogs) || dogs.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  const items = dogs.map((dog) => {
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

  return (
    <div >
      <div className={styles.cardsContainer}>
        <>{items}</>
      </div>

      <div className={styles.btnContainer}>
        <button onClick={prevHandler}>Prev</button>
        <button onClick={nextHandler}>Next</button>
      </div>
    </div>
  );
};
export default Cards;
