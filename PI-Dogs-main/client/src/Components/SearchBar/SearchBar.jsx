import { useState } from "react";
import styles from "./searchBar.module.css";

export default function SearchBar({onSearch}){
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

    return(
        <div className={styles.searchContainer}>
            <div>
              <input size="12" type="search" placeholder="Id o Nombre" onChange={handleChange} value={name} />
            </div>
            <div>
              <button onClick={() => onSearch()}>Search</button>
            </div>
        </div>
    )
}