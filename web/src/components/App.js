import React from 'react';
import { fetchProducts } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import { render } from 'react-dom';
//import Header from './Header';
import Main from './Main';
import albumItems from '../data/album';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        productResults: albumItems,
        returnedCount: 9
      }
  }
  render() {
      return (
          <div>
              {/* <Main album={this.state.album} /> */}
              <Main />
          </div>
      );
  }
}


function mapStateToProps(state) {
  return {
     productResults: state.productResults,
     returnedCount: state.returnedCount
  };
}

function mapDispatchToProps(dispatch) {
//  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
