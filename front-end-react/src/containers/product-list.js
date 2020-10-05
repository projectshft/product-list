import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {
  renderProducts() {
    const name = allProdsUnsorted.listOfAllProducts.map(product => product.name)
    const category = allProdsUnsorted.listOfAllProducts.map(product => product.category)
    const price = allProdsUnsorted.listOfAllProducts.map(product => product.price)
    const image = allProdsUnsorted.listOfAllProducts.map(product => product.image)
  
    return (
      <tr key={allProdsUnsorted.listOfAllProducts._id}>
        <td>{name}</td>
        <td>{category}</td>
        <td>{price}</td>
        <td>{image}</td>
      </tr>
    );  
  }

  render() {
    return (
      <table className="table">
        {/* <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead> */}
        <tbody>{this.props.product.map(this.renderProducts)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ product }) {
  return { product };
}

export default connect(mapStateToProps)(ProductList);