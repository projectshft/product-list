import React, { Fragment, Component } from 'react';
import ProductCard from './product_card';
import SearchInformation from './search_information';
import SearchAndSort from './search_and_sort';
import Pagination from './pagination';

class App extends Component {
  render() {
    return (
    <Fragment>
      <div className="container">
        <h1 className="mx-auto">Project Shift Store</h1>
      </div>
      <SearchAndSort />
      <SearchInformation />
      <div className="container">
        <div className="row">
          <ProductCard />
        </div>
      </div>
      <Pagination />
    </Fragment>
    );
  }
}

export default App;
