import React from "react";
import { Switch, Route } from "react-router-dom";

// design imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// importing components
import FilterOptionsBar from "./FilterOptionsBar";
import ProductGrid from "./ProductGrid";

const App = () => {
  return (
    <div>
      <Container maxwidth="sm">
        <Typography variant="h3">Products</Typography>
        <FilterOptionsBar />

        <Switch>
          <Route exact path={["/"]} component={ProductGrid} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
