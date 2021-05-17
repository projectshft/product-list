import { Redirect, Route, Switch } from "react-router";
import MainProductsPage from "./components/MainProductsPage";
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/products" component={MainProductsPage}/>
      <Redirect to="/products"/>
    </Switch>
  );
}

export default App;
