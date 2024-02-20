import style from "./pagination.module.css";

function Pagination({ countries, setPage, currentPage }) {
  const pageNumbers = [1];

  for (let i = 2; i <= Math.floor(countries / 10); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.value === "prev") {
      setPage(currentPage - 1);
    }
    if (e.target.value === "next") {
      setPage(currentPage + 1);
    }
  };

  const handleChange = (n) => {
    setPage(n);
  };

  return (
    <div className={style.main}>
      <div className={style.list}>
        <button disabled={currentPage === 1} onClick={handleClick} value="prev">
          {"<<"}
        </button>

        <ul>
          {pageNumbers.map((p) => (
            <li className={p === currentPage ? style.current : ""} key={p}>
              <a onClick={() => handleChange(p)}>{p}</a>
            </li>
          ))}
        </ul>

        <button
          disabled={currentPage === pageNumbers.length}
          onClick={handleClick}
          value="next"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
