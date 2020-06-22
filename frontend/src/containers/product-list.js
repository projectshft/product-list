import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {
  renderProducts(productData) {

    const name = cityData.city.name;
    const temp = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities =  cityData.list.map(weather => weather.main.humidity);

    return (
      <tr key={cityData.city.id}>
        <td>{name}</td>
        <td>
          <Chart data={temp} color="orange" units="F" />
        </td>
        <td>
          <Chart data={pressures} color="green" units="hPa" />
        </td>
        <td>
          <Chart data={humidities} color="black" units="%" />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ products }) {
  return { products };
}

export default connect(mapStateToProps)(ProductList);