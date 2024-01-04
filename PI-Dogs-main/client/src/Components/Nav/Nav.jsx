import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'
import styles from '../Nav/nav.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getDogs } from "../../redux/actions";
import { findDogByName } from "../../redux/actions";

export default function Nav() {

    const dispatch = useDispatch();
    
    const onSearch = async (id) => {
        dispatch(findDogByName(id));
    };

    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.btnContainer}>
                    <ul>
                        <li className={styles.logo}>THE DOGS API</li>
                        <li><Link to={'/home'}><button>Home</button></Link></li>
                        <li><Link to={'/dogs'}><button>Create Dog</button></Link></li>
                        <li><Link to={'/about'}><button>About</button></Link></li>
                    </ul>
                </div>

                <div className={styles.searchContainer}>
                    <SearchBar onSearch={onSearch} />
                </div>
            </nav>
        </>
    );
}