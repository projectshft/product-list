import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";

const Pages = ({ count, fetchLogs, queryParams }) => {
  const [active, setActive] = useState(1);

  const clickHandler = async (number) => {
    await fetchLogs(
      queryParams.query,
      queryParams.category,
      queryParams.price,
      number
    );
    setActive(number);
  };


  let items = [];

  let pages = Math.ceil(count / 9);
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={(e) => clickHandler(number)}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div id="pages">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default Pages;
