import React from "react";
import Product from "./Product";
import { useState, useEffect } from "react";

const List = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:8000/products");
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const getLogs = async () => {
      const logsFromServer = await fetchLogs();
      setLogs(logsFromServer);
    };

    getLogs();
  }, [logs]);

  return (
    <div className="grid-container">
      {logs.map((log) => (
        <Product key={log.id} log={log} />
      ))}
    </div>
  );
};

export default List;
