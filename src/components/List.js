import React from "react";
import Product from "./Product";
import Pages from "./Pages";

const List = ({ items, count, fetchLogs, queryParams }) => {
  return (
    <>
      <div className="grid-container">
        {items.map((item) => (
          <Product item={item} />
        ))}
      </div>
      <Pages count={count} fetchLogs={fetchLogs} queryParams={queryParams} />
    </>
  );
};

export default List;
