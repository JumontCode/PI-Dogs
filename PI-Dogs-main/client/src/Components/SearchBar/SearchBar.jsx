import { useState } from "react";
import styles from "./searchBar.module.css";

export default function SearchBar({onSearch}){
  const [id, setId] = useState("");

  function handleChange(event) {
    if(event){
      setId(event.target.value);
    }
  }

    return(
        <div className={styles.searchContainer}>
            <div>
              <input size="12" type="search" placeholder="Id o Nombre" onChange={handleChange} value={id} />
            </div>
            <div>
              <button onClick={() => onSearch(id)}>Search</button>
            </div>
        </div>
    )
}