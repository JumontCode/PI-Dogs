import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'
import styles from '../Nav/nav.module.css';


export default function Nav({onSearch}){
    return(
        <>
            <nav className={styles.navContainer}>
                    <div className={styles.btnContainer}>
                        <ul>
                            <li className={styles.logo}>THE DOGS API</li>
                            <li><Link to={'/home'}><button>Home</button></Link></li>
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