import React from "react";
import { Switch, Route } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import SearchPage from "./SearchPage";

import "../css/App.css";

const App = () => {
  return (
    <Container fluid id="app-view">

      {/* Header */}
      <Row id="header">
        <Col>
          <header>
            <h1>Products</h1>
          </header>
        </Col>
      </Row>

      <Switch>
        {/* Default/List View */}
        <Route exact path={["/", "/products"]} component={SearchPage} />
      </Switch>

    </Container>
  );
};

export default App;
