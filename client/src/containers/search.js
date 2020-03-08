import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';


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
      <div className="col-md-3">
        <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
          <label className="col-form-label" style={{paddingRight: "5px", paddingLeft: "30px"}}>Search</label>
          <input className="form-control form-control-sm" id="inputSearch"/>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Search);