import { useEffect } from "react";
import { Card } from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import styles from "./cards.module.css";

export const Cards = ({ dogs }) => {

  console.log(dogs);

  return (
    <div className={styles.cardsContainer}>
      {dogs.map((dog) => {
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
      })}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     dogs: state.dogs,
//   };
// };

// export default connect(mapStateToProps, null)(Cards);
export default Cards;
