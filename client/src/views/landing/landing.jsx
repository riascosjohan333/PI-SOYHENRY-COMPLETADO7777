import { Link } from "react-router-dom";

import style from "./landing.module.css";

function Landing() {
  return (
    <div className={style.main}>
      <div className={style.title}>
        <h2>PI: Countries <span className="soyhenry">#SoyHenry</span></h2>
      </div>
      <Link className={style.btn} to="/home">
        <button>Ingresar</button>
      </Link>
      <div className={style.footer}>
        <p>Johan Riascos - WebPT-16B</p>
      </div>
    </div>
  );
}

export default Landing;
