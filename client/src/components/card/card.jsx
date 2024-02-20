import { Link } from "react-router-dom";

import style from "./card.module.css";

function Card({ id, image, name, continent, population }) {
  return (
    <Link className={style.link} to={`/countries/${id}`}>
      <div className={style.main}>
        <img src={image} alt={name} />
        <span>{name}</span>
        <p>{continent ? continent : "Unknown"}</p>
        
       
        
      </div>
    </Link>
  );
}

export default Card;
