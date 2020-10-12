import React from 'react';
import { fetchProducts } from '../actions';
import { getCategories } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
// import { render } from 'react-dom';
//import Header from './Header';
import Main from './Main.js';
// import albumItems from '../data/album';


class App extends React.Component {
  // constructor(props) {
      // super(props);
      // this.state = {
      //   products: state.products
      // }
      componentDidMount() {
      console.log('props.products @ App =', this.props.products)
      if (this.props.products.list.length === 0) {
          console.log('trying to trigger fetchProducts()')
          this.props.fetchProducts(null, null, null, null);
          console.log(' ->and got props.products', this.props.products)
        }
      if (!this.props.categories.length) {
        this.props.getCategories();
        console.log(' -> got category props @ App.js', this.props.categories)
      };
      }
  // }
  render() {
      return (
          <div>
              {/* <Main album={this.state.album} /> */}
              <Main />
          </div>
      );
  }
}

// TODO get rid of this?
function mapStateToProps(state) {
  return {
     products: state.products,
     categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({ fetchProducts, getCategories }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
