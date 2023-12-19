import React from "react";
import styles from "./card.module.css";

export const Card = ({ id, name, image, weight, temperaments }) => {
  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        {/* <p>{id}</p> */}
        <div className={styles.buttonContainer}>
          <img src={image} alt="" />
        </div>
        <div className={styles.info}>
          <p>{name}</p>
          <p>{weight}</p>
          <p>{temperaments}</p>
        </div>
      </div>
    </div>
  );
};
