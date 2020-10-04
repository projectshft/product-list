import React from 'react';
import { Component } from 'react';
import { fetchStore } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import { render } from 'react-dom';
//import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import albumItems from '../data/album';
import socialLinks from '../data/socialLinks';
 

class App extends React.Component {
  constructor(props) {
      super(props);

      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
          collapsed: true,
          socialLinks: socialLinks,
          album: albumItems
      };
  }

  toggleNavbar() {
      this.setState({
          collapsed: !this.state.collapsed
      });
  }
  render() {
      return (
          <div>
              <Main album={this.state.album} />
          </div>
      );
  }
}


function mapStateToProps(state) {
  return {
 //   destinations: state.destinations,
   // selectedRadius: state.selectedRadius,
  };
}

function mapDispatchToProps(dispatch) {
//  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
