import React from 'react';
import { Component } from 'react';
import IndividualProductDiv from './individual-product'

//this will be the outer container component that holds our product rows and products
//the products are passed down as props so we can access them in this component. Each row will be passed a product as a prop and the product's id will be used a the key (react requirement)
export default class ProductContainer extends Component {


  renderProducts(products) {
    // products.map(products)
    console.log('products in renderProducts function:', products)

    // const name = cityData.city.name;
    // const temps = cityData.list.map(weather => weather.main.temp);
    // const pressures = cityData.list.map(weather => weather.main.pressure);
    // const humidities = cityData.list.map(weather => weather.main.humidity);
    // console.log(temps,pressures,humidities)
    return (
      <div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
      </div>
    );

  }


  render() {
    const products = this.props.products;

    return (
      <div>
        {this.renderProducts(products)}
      </div>
    );
  }
}