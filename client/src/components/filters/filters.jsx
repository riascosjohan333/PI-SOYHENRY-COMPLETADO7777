import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  orderByName,
  orderByPopulation,
  filterByContinents,
  getActivities,
  filterByActivities,
  resetFilters,
} from "../../redux/actions";

import style from "./filters.module.css";

function Filters({ setPage }) {
  const dispatch = useDispatch();

  const alphaOrder = "Orden alfabético";
  const filterPopulation = "Filtrar por población";
  const filterContinent = "Filtrar por continente";
  const filterActivities = "Actividades";

  const [reset, setReset] = useState({
    alphabetical: alphaOrder,
    population: filterPopulation,
    continent: filterContinent,
    activities: filterActivities,
  });

  const activities = useSelector((state) => state.activities);
  const resetTrue = useSelector((state) => state.reset);

  const handleOrderName = (e) => {
    e.preventDefault();
    setReset({
      ...reset,
      alphabetical: e.target.value,
      population: filterPopulation,
    });
    dispatch(orderByName(e.target.value));
  };

  const handleOrderPopulation = (e) => {
    e.preventDefault();
    setReset({
      ...reset,
      population: e.target.value,
      alphabetical: alphaOrder,
    });
    dispatch(orderByPopulation(e.target.value));
  };

  const handleFilterContinent = (e) => {
    e.preventDefault();
    setReset({
      continent: e.target.value,
      alphabetical: alphaOrder,
      population: filterPopulation,
      activities: filterActivities,
    });
    setPage(1);
    dispatch(filterByContinents(e.target.value));
  };

  const handleFilterActivities = (e) => {
    e.preventDefault();
    setReset({
      activities: e.target.value,
      alphabetical: alphaOrder,
      population: filterPopulation,
      continent: filterContinent,
    });
    setPage(1);
    dispatch(filterByActivities(e.target.value));
  };
  useEffect(() => {
    dispatch(getActivities());
    if (resetTrue)
      setReset({
        alphabetical: alphaOrder,
        population: filterPopulation,
        continent: filterContinent,
        activities: filterActivities,
      });
    dispatch(resetFilters(false));
  }, [resetTrue]);

  return (
    <div className={style.main}>
      <select
        className={style.select}
        onChange={handleOrderName}
        value={reset.alphabetical}
      >
        <option>Orden alfabético</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select
        className={style.select}
        value={reset.population}
        onChange={handleOrderPopulation}
      >
        <option>Filtrar por población</option>
        <option value="min">Min</option>
        <option value="max">Max</option>
      </select>
      <select
        className={style.select}
        value={reset.continent}
        onChange={handleFilterContinent}
      >
        <option>Filtrar por continente</option>
        <option value="All">All</option>
        <option value="Americas">America</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
      </select>
      <select
        className={style.select}
        value={reset.activities}
        onChange={handleFilterActivities}
      >
        <option disabled>Actividades</option>
        <option value="All">All</option>
        {activities.map((a) => (
          <option value={a.name}>{a.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
