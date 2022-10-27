/* eslint-disable jsx-a11y/anchor-is-valid */
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import { PageLayout } from "./components/pageLayout.js";
import { RenderCard } from "./components/RenderCard.js";


const App = () => {
  return (
    <div>
      <PageLayout />
      <RenderCard />
    </div>
  );
};


export default App;
