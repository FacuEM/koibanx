import { useInput } from "../../hooks/useInput";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./search.module.scss";

const Search = () => {
  const history = useHistory();
  const { value, bind, reset } = useInput("");
  const [searchBy, setSearchBy] = useState("id");
  const options = ["ID", "CUIT", "Comercio"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push(`/search?${searchBy}=${value}`);
    reset();
  };
  const handleChange = (e) => {
    setSearchBy(options[e.target.value].toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <select onChange={(e) => handleChange(e)} className={styles.select}>
        {options.map((opt, key) => (
          <option key={key} value={key}>
            {opt}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Find a store"
        {...bind}
        name="store"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default Search;
