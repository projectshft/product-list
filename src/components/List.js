import React from "react";
import Product from "./Product";

const List = ({items}) => {

  // const fetchLogs = async () => {
  //   const res = await fetch("http://localhost:8000/products");
  //   const data = await res.json();

  //   return data;
  // };

  // useEffect(() => {
  //   const getLogs = async () => {
  //     const logsFromServer = await fetchLogs();
  //     setLogs(logsFromServer);
  //   };

  //   getLogs();
  // }, [logs]);

  return (
    <div className="grid-container">
      {items.map((item) => (
        <Product item={item} />
      ))}
    </div>
  );
};

export default List;
