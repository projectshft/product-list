import React from "react";
import Typography from "@material-ui/core/Typography";

// components used
import SingleProductBox from "./SingleProductBox";
import Footer from "./Footer";

const ProductGrid = () => {
  return (
    <div>
      <Typography variant="h2">ProductGrid</Typography>
      <SingleProductBox />
      <Footer />
    </div>
  );
};

export default ProductGrid;
