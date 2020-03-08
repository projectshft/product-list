import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCategory } from '../actions/index';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      category: 'Baby',
  
    };

    // this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);

    // this.onPriceChange = this.onPriceChange.bind(this);
    // this.onPriceClick = this.onPriceClick.bind(this);
  }

  // onCategoryChange(event) {
  //   console.log(event.target.value)
  //   this.setState({ category: event.target.value });
  //   event.preventDefault();
  //   console.log(event)
  //   this.props.fetchCategory(this.state.category);
  //   this.setState({ category: ''});
  // }

  onCategoryClick(event) {
    console.log(event.target.value)
    this.setState({ category: event.target.value });
    event.preventDefault();
    console.log(event)
    this.props.fetchCategory(this.state.category);
    this.setState({ category: ''});
    // event.preventDefault();
    // console.log(event)
    // this.props.fetchCategory(this.state.category);
    // this.setState({ category: ''});
  }


  render() {
    return (
      <div className="row row-cols-3 w-75 p-3" style={{flexWrap: "nowrap"}}>
        <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
          <label className="col-form-label" style={{paddingRight: "5px", paddingLeft: "30px"}}>Search</label>
          <input className="form-control form-control-sm" id="inputSearch"/>
        </form>
        <form className="input-group" style={{margin: "10px"}}>
        <select onClick={this.onCategoryClick} value={this.state.category} className="form-control form-control-sm">
            <option onChange={this.onCategoryChange} value={this.state.category} value="Baby">Baby</option>
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
  return bindActionCreators({ fetchCategory }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Search);