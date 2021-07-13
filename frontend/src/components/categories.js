import React from "react";
import { v4 as uuidv4 } from "uuid";

const Categories = (props) => {
  const categories = props.categories[0];

  if (Array.isArray(categories) && categories.length) {
    return props.categories[0].map((category, index) => {
      return (
        <option value={category} key={index}>
          {category}
        </option>
      );
    });
  }

  return (
    <option value="" key={uuidv4}>
      No Categories
    </option>
  );
};

export default Categories;
