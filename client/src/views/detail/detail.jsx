import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getCountryDetail } from "../../redux/actions";

import style from "./detail.module.css";

function intToString(value) {
  var suffixes = ["", "K", "M", "B", "T"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(2);
  }
  return shortValue + suffixes[suffixNum];
}

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, []);

  const countryDetail = useSelector((state) => state.countryID);

  const handleReset = () => {
    dispatch(getCountryDetail());
  };
  return (
    <div className={style.main}>
      <div className={style.btn}>
        <Link to={"/home"} onClick={handleReset} className={style.link}>
          <span>Home</span>
        </Link>
      </div>
      <div className={style.detail}>
        <h1>{countryDetail.name}</h1>
        <img src={countryDetail.image} alt={countryDetail.name} />
        <h2>Capital: {countryDetail.capital}</h2>
        <div className={style.spans}>
          <span>Subregion: {countryDetail.subregion}</span>
          <span>Continente: {countryDetail.continent}</span>
          <span>Area: {intToString(countryDetail.area)} Km2</span>
          <span>Población: {intToString(countryDetail.population)}</span>
        </div>
        <h2>Activitidades</h2>
        <div className={style.list}>
          <ul>
            {countryDetail.Activities &&
              countryDetail.Activities.map((act) => (
                <li key={act.id}>
                  <h3>{act.name}</h3>
                  <p>Dificultad: Level {act.difficulty} (1 to 5)</p>
                  <p>Duración: {act.duration} hs</p>
                  <p>Estación: {act.season}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Detail;
