import React from "react";
import { Switch, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

// importing components
import FilterOptionsBar from "./FilterOptionsBar";
import ProductGrid from "./ProductGrid";

const App = () => {
  return (
    <div>
      <Typography variant="h2">Products</Typography>
      <FilterOptionsBar />
      <ProductGrid />
      <Switch></Switch>
    </div>
  );
};

export default App;
