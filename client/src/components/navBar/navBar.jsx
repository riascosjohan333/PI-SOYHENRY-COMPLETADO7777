import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import SearchBar from "../searchBar/searchBar";

import { getCountries, resetFilters } from "../../redux/actions";

import style from "./navBar.module.css";

function NavBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(getCountries());
    dispatch(resetFilters(true));
  };

  return (
    <div className={style.main}>
      <div className={style.btn2}>
        <Link className={style.link_create} to={"/create"}>
          <span>Crear Actividad</span>
        </Link>
      </div>
      <div className={style.btn1}>
        <Link className={style.link_home} onClick={handleReset}>
         Countries
        </Link>
      </div>
      <div>
        <SearchBar setPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default NavBar;
