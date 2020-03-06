import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProducts} from '../actions/index';
import '../index.css';



class Pages extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 1
    }

    //this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
}



  onFormSubmit(event) {
    this.props.fetchProducts()
  }

  render() {
      return (
          <div class="row" id="sidebar-border">
              <div id="side-bar" class="col-2">
                  <button onClick={this.onFormSubmit}>Get Products</button> ​
              </div>
          </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchProducts
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Pages);