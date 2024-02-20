import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCountriesName } from "../../redux/actions";

import style from "./searchBar.module.css";

const validate = (input) => {
  const errors = {};
  if (input === "") {
    errors.input = "Cannot be empty";
  }
  if (/^\s+/gi.test(input)) {
    errors.input = "Cannot start with a space";
  }
  return errors;
};

function SearchBar({ setPage }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput(() => {
      setErrors(() => validate(e.target.value));
      return e.target.value;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.input) {
      return alert(errors.input);
    }
    dispatch(getCountriesName(input));
    setInput("");
    setPage(1);
  };

  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit} className={style.search}>
        <input
          value={input}
          onChange={handleChange}
          name="search"
          placeholder="Search"
        />
        <button type="submit">🔍</button>
      </form>
    </div>
  );
}

export default SearchBar;
