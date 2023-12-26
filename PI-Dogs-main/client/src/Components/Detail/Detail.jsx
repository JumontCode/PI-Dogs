import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../Detail/detail.module.css";

export default function Detail() {

    const { id } = useParams();
    const usnav = useNavigate();
    const [dog, setDog] = useState({});

    const findDog = async () => {
        try {
            const { data } = await axios(`https://localhost:3001/dogs/${id}`);
            if (data.name) {
                setDog(data);
            } else {
                window.alert("No hay perros con ese ID");
                usnav("/");
            }
        } catch (error) {
            console.error("Error al obtener datos del perro:", error);
            // usnav("/error");
        }
    }

    useEffect(() => {
        findDog(id);

        return () => {
            setDog({});
        };
    }, [id]);

    return (
        <div className={styles.DetailContainer}>
            <>
                {/* <h2>SOY EL DETAIL</h2> */}
                <div className={styles.card_left}>
                    <img src={dog.image} alt="imagen" />
                </div>
                <div className={styles.card_right}>
                    <NavLink onClick={() => usnav(-1)}>
                        <button className={styles.buttonReturn}>Regresar</button>
                    </NavLink>

                    <div className={styles.containerInfo}>
                        <div className={styles.info}></div>
                        <h2>Numero de identificacion: {dog.id}</h2>
                        <h2>name: {dog.name}</h2>

                        <br />
                        <p className={styles.description}>
                            Description: Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Veniam voluptatum quo, expedita accusamus ullam modi,
                            asperiores minima eius iusto fugit, obcaecati ipsum explicabo? Ea
                            illo necessitatibus suscipit harum mollitia ad.

                            <br /> <br /> <br />
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed consequatur voluptates
                            numquam.
                        </p>
                    </div>
                </div>
            </>
        </div>
    );
}