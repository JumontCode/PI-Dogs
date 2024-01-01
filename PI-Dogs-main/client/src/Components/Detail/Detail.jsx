import styles from "../Detail/detail.module.css";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../redux/actions";

function normalizeData(dog) {
    return {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        temperaments: dog.temperaments,
        weight: dog.weight,
        height: dog.height,
    };
}

export default function Detail() {
    const { id } = useParams();
    const usnav = useNavigate();

    const dog = useSelector((state) => state.dogDetail)
    const dispatch = useDispatch();

    console.log(dog);

    useEffect(() => {
        dispatch(getDetail(id))
    }, []);
    
    return (
        <div className={styles.DetailContainer}>
            <>
                <div className={styles.card_left}>
                    <img src={dog.image} alt="imagen" />
                </div>
                <div className={styles.card_right}>
                    <NavLink onClick={() => usnav(-1)}>
                        <button className={styles.buttonReturn}>Regresar</button>
                    </NavLink>

                    <div className={styles.containerInfo}>
                        <div className={styles.info}></div>
                        {/* <h2>Número de identificación: {dog.id}</h2> */}
                        <h2>DETAIL COMPONENTS</h2>
                        <h2>Nombre: {dog.name}</h2>

                        <br />
                        <p className={styles.description}>
                            Life: {dog.life}
                            <br /> <br /> <br />
                            Description: {dog.bredfor}
                            <br /> <br /> <br />
                            <p>Temperaments: {dog.temperaments}</p>
                        </p>
                    </div>
                </div>
            </>
        </div>
    );
}