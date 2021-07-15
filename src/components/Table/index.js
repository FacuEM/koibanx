import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FIELDS } from "../../helpers/config";
import { queryMaker } from "../../helpers/querys";
import styles from "./table.module.scss";
import Loader from "react-loader-spinner";
import Data from "../../data.json";
import Pagination from "../Pagination";

const Table = () => {
  const history = useHistory();

  let { search } = useLocation();
  let query = queryMaker(search);

  const [data, setData] = useState(Data);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [orderBtn, setOrderBtn] = useState({ comercio: false, cuit: false });

  //Pagination

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * Data.rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - Data.rowsPerPage;

  const currentItem = data.total
    ? data.data.slice(indexOfFirstItem, indexOfLastItem)
    : data;

  //

  const fetchData = async () => {
    setLoading(true);
    let response = await fetch(query);
    let responseJson = await response.json();
    setData(responseJson);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setChecked(!checked);
    query = queryMaker(search, !checked);
    console.log("API", query);
    /* fetchData(); */
  };

  const handleClickOrder = (e, field) => {
    e.preventDefault();
    if (field === "Comercio") {
      setOrderBtn({ ...orderBtn, comercio: !orderBtn.comercio });
    } else {
      setOrderBtn({ ...orderBtn, cuit: !orderBtn.cuit });
    }
    query = queryMaker(search, checked, field, orderBtn);

    console.log("API", query);
    /*   fetchData(); */
  };

  useEffect(() => {
    console.log("API", query);
    /* fetchData(); */
  }, []);

  if (loading && !data) {
    return (
      <Loader
        type="Ball-Triangle"
        color="#7ea8f8"
        height={100}
        width={100}
        style={{ marginTop: "25%" }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <label>
          Only active stores:{" "}
          <input
            name="active"
            type="checkbox"
            checked={checked}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {FIELDS.map((field, i) => {
              if (field === "Comercio" || field === "CUIT") {
                return (
                  <th key={i}>
                    <div className={styles.orderDiv}>
                      {field}
                      {orderBtn[field.toLowerCase()] ? (
                        <i
                          className="bi bi-sort-down"
                          onClick={(e) => handleClickOrder(e, field)}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-sort-down-alt"
                          onClick={(e) => handleClickOrder(e, field)}
                        ></i>
                      )}
                    </div>
                  </th>
                );
              }
              return <th key={i}>{field}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {currentItem.map((data, i) => {
            return (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.comercio}</td>
                <td>{data.cuit}</td>
                <td>{data.concepto1}</td>
                <td>{data.concepto2}</td>
                <td>{data.concepto3}</td>
                <td>{data.concepto4}</td>
                <td>{data.concepto5}</td>
                <td>{data.concepto6}</td>
                <td>{data.balanceActual}</td>
                <td>{data.activo}</td>
                <td>{data.ultimaVenta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{}}>
        <ul className={styles.pagination}>
          <Pagination
            rowsPerPage={data.rowsPerPage}
            total={data.total}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </ul>
      </div>

      <button className={styles.back} onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default Table;
