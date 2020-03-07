import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCategory } from '../actions/index';


class Category extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      category: '',
      // price: ''
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);

    // this.onPriceChange = this.onPriceChange.bind(this);
    // this.onPriceClick = this.onPriceClick.bind(this);
  }

  onCategoryChange(event) {
    console.log(event.target.value)
    this.setState({ category: event.target.value });
  }

  onCategoryClick(event) {
    event.preventDefault();

    this.props.fetchCategory(this.state.category);
    this.setState({ category: ''});
  }

  // onPriceChange(event) {
  //   console.log(event.target.value)
  //   this.setState({ price: event.target.value });
  // }

  // onPriceClick(event) {
  //   event.preventDefault();

  //   this.props.fetchPrice(this.state.price);
  //   this.setState({ price: ''});
  // }

  render() {
    return (
      <div className="row row-cols-3 w-75 p-3" style={{flexWrap: "nowrap"}}>
        <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
          <label className="col-form-label" style={{paddingRight: "5px", paddingLeft: "30px"}}>Search</label>
          <input className="form-control form-control-sm" id="inputSearch"/>
        </form>
        <form onClick={this.onCategoryClick} className="input-group" style={{margin: "10px"}}>
        <select className="form-control form-control-sm" onChange={this.onCategoryChange} value={this.state.category}>
            <option value="Baby">Baby</option>
            <option value="Garden">Garden</option>
        </select>
        </form>
        <form  className="input-group" style={{margin: "10px"}}>
        <select className="form-control form-control-sm">
            <option value="Highest">Highest to Lowest</option>
            <option value="Lowest">Lowest to Highest</option>
        </select>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategory}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Category);

// onClick={this.onPriceClick}
// onChange={this.onPriceChange} value={this.state.price}