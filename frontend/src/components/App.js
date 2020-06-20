import React from "react";
import { Switch, Route } from "react-router-dom";

// design imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// importing components
import FilterOptionsBar from "./FilterOptionsBar";
import ProductGrid from "./ProductGrid";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxwidth="sm">
        <Typography variant="h3" className={classes.header}>
          Products
        </Typography>
        <FilterOptionsBar />

        <Switch>
          <Route exact path={["/"]} component={ProductGrid} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
