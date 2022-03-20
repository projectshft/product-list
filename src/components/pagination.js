import { useDispatch } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import { fetchProducts } from '../actions';

const Pages = () => {
  const dispatch = useDispatch();

  // Tried a few things to avoid hard coading but couldnt get anything to work how i wanted...
  const pagination = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-4">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            onSelect={(eventKey) => dispatch(fetchProducts('page', eventKey))}
          >
            <Tab eventKey="1" title="1" />
            <Tab eventKey="2" title="2" />
            <Tab eventKey="3" title="3" />
            <Tab eventKey="4" title="4" />
            <Tab eventKey="5" title="5" />
            <Tab eventKey="6" title="6" />
            <Tab eventKey="7" title="7" />
            <Tab eventKey="8" title="8" />
            <Tab eventKey="9" title="9" />
          </Tabs>
        </div>
      </div>
    </div>
  );

  return <div>{pagination()}</div>;
};

export default Pages;
