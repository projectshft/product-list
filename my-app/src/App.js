import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBars from './components/SearchBars'
import Products from './components/Products'

function App() {
  return (
    <div className="App">
      <Row>
        <Col xs={{ span: 10, offset: 1}}>
          <SearchBars/>
          <Products />
        </Col>
      </Row>
    </div>
  );
}

export default App;
