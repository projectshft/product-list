/* eslint-disable jsx-a11y/anchor-is-valid */
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import { PageLayout } from "./components/pageLayout.js";
import { CardDeck } from "./components/cardDeck.js";



const App = () => {
  return (
    <div>
      <PageLayout />
      <CardDeck />
    </div>
  );
};


export default App;
