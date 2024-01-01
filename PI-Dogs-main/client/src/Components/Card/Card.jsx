import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

export const Card = ({ id, name, image, weight, temperaments }) => {
  const temperamentArray = typeof temperaments === 'string' ? temperaments.split(",") : [];

  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <Link to={`/detail/${id}`}>
          <p className={styles.nameCard} key={id} >{name}</p>
        </Link>
        <div className={styles.buttonContainer}>
          <img src={image} alt="" />
        </div>
        <div className={styles.info}>
          <p>{`${weight}`}</p>
          {temperamentArray.length > 3 ? (
            <p>{`${temperamentArray[0]}, ${temperamentArray[1]}, ${temperamentArray[2]}`}</p>
          ) : (
            <p>{`${temperaments}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};