import React from "react";
import styles from "./card.module.css";

export const Card = ({ id, name, image, weight, temperaments }) => {
  const temperamentArray = typeof temperaments === 'string' ? temperaments.split(",") : [];

  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <p>{name}</p>
        <div className={styles.buttonContainer}>
          <img src={image} alt="" />
        </div>
        <div className={styles.info}>
          <p>{`Peso: ${weight}`}</p>
          {temperamentArray.length > 3 ? (
            <p>{`${temperamentArray[0]} ${temperamentArray[1]} ${temperamentArray[2]}`}</p>
          ) : (
            <p>{temperaments}</p>
          )}
        </div>
      </div>
    </div>
  );
};