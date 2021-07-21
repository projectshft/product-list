import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const categories = useSelector((state) =>
    state.products.reduce((acc, product) => {
      if (!acc.includes(product.category)) {
        return [...acc, product.category];
      } else {
        return acc;
      }
    }, [])
  );

  console.log(categories);
  return (
    <div className="container header">
      <div className="row">
        <div className="column col-md-6">
          <input className="form-control" type="text" placeholder="Search" />
        </div>
      </div>
    </div>
  );
}
