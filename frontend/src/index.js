import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./components/App";
import ReduxPromise from "redux-promise";

import reducers from "./reducers";

const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
  palette: {
    secondary: {
      main: "#002BCA",
    },
  },
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
