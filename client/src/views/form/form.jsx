import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postActivity, getCountries } from "../../redux/actions";

import style from "./form.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Don't forget the name!";
  } else if (!input.name.trim()) {
    errors.name = "Blank spaces are not accepted";
  }
  return errors;
}

function Create() {
  const dispatch = useDispatch();
  const navidate = useNavigate();

  const countries = useSelector((state) => state.countries);

  const [input, setInput] = useState({
    name: "",
    difficulty: "1",
    duration: "",
    season: "",
    countries: [],
  });

  const [btn, setBtn] = useState(true);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (input.name && input.difficulty && input.season) setBtn(false);
    else setBtn(true);
  }, [input, setBtn]);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectSeason = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      season: e.target.value,
    });
  };

  const handleSelectCountries = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  };

  const handleDeleteTemp = (del) => {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== del),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.countries.length) {
      return alert("You missed the country option");
    }
    const data = {
      ...input,
      name: (
        input.name.toLowerCase().charAt(0).toUpperCase() +
        input.name.toLowerCase().slice(1)
      ).trim(),
    };
    dispatch(postActivity(data));
    alert("The new activity has created!");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    navidate("/home");
  };

  return (
    <div className={style.main}>
      <div className={style.btn_link}>
        <Link className={style.link} to="/home">
          <span>Home</span>
        </Link>
      </div>
      <div className={style.form_container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.title}>
            <h3>Create the Activity!</h3>
          </div>
          <div className={style.name}>
            <label>Name: </label>
            <input
              className={style.input}
              placeholder="Name"
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && <span className={style.error}>{errors.name}</span>}
          </div>

          <div>
            <label>Difficulty {`[${input.difficulty}]`}: </label>
            <input
              className={style.input}
              placeholder="Difficulty"
              type="range"
              min="1"
              max="5"
              value={input.difficulty}
              name="difficulty"
              onChange={handleChange}
            />
            {errors.difficulty && (
              <span className={style.error}>{errors.difficulty}</span>
            )}
          </div>

          <div className={style.duration}>
            <label>Duration: </label>
            <input
              className={style.input}
              placeholder="Duration"
              type="number"
              value={input.duration}
              min={"1"}
              name="duration"
              onChange={handleChange}
            />
            {" hs"}
          </div>

          <div className={style.season}>
            <label>Season: </label>
            <select defaultValue={"Choose"} onChange={handleSelectSeason}>
              <option disabled>Choose</option>
              {["Summer", "Autumn", "Winter", "Spring"].map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          <label>Countries:</label>

          <div className={style.select_countries}>
            <select defaultValue={"Choose"} onChange={handleSelectCountries}>
              <option disabled>Choose</option>
              {countries.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className={style.btn_create}>
            <button disabled={btn} type="submit">
              Create
            </button>
          </div>
        </form>
        {input.countries &&
          input.countries.map((c) => (
            <div className={style.del}>
              <span>{c}</span>
              <button onClick={() => handleDeleteTemp(c)}>X</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Create;
