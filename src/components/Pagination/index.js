import styles from "./pagination.module.scss";
import { useState } from "react";

const Pagination = ({ rowsPerPage, setCurrentPage, total, currentPage }) => {
  const [pageNumberLimit] = useState(rowsPerPage);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(rowsPerPage);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const pages = [];

  for (let i = 1; i <= Math.ceil(total / rowsPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      <li
        onClick={handlePrevbtn}
        className={currentPage === pages[0] ? styles.disabled : null}
      >
        Prev
      </li>

      {pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              id={number}
              onClick={handleClick}
              className={currentPage === number ? styles.active : null}
            >
              {number}
            </li>
          );
        } else return null;
      })}

      <li
        onClick={handleNextbtn}
        className={
          currentPage === pages[pages.length - 1] ? styles.disabled : null
        }
      >
        Next
      </li>
    </>
  );
};

export default Pagination;
