import styles from "../Detail/detail.module.css";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../redux/actions";


export default function Detail() {
    const { id } = useParams();
    const usnav = useNavigate();
    const dispatch = useDispatch();

    const dog = useSelector((state) => state.dogDetail)

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
                        <h2>DETAIL COMPONENTS</h2>
                        <h2>Breeds: {dog.name}</h2>

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