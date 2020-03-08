import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editPage, fetchProducts } from '../actions/index';
import '../index.css';



class Pages extends Component {

  //initial fetch when page
  componentDidMount() {
    this.props.fetchProducts(this.props)
  }
  //refetches everytime the query state updates
  componentDidUpdate() {
    this.props.fetchProducts(this.props)
  }

  //handles event when user hits a page button
  onFormSubmit(event) {
    //updates the query state
    this.props.editPage(`page=${event.target.value}`)
  }

  renderOneButton(pages) {
    //creates an empty arrray to push the JSX into
    let buttonsHTML = []
    //loops through how many pages there are and creates a button for each page
    for (let i = 1; i <= pages; i++) {
      buttonsHTML.push(<button className='button' type='onSubmit' onClick={this.onFormSubmit} key={i} value={i}>{i}</button>)
    }
    //returns JSX to be rendered in render()
    return (
      <div>{buttonsHTML}</div>
    )
  }
  render() {
    return (
      <div className='pages'>
        {this.renderOneButton(this.props.pages)}
      </div>
    )
  }
}

//Only recieves the query state so that its not in a continually rerendering loop!!!
function mapStateToProps(state) {
  console.log('this is data from products', state)
  return state.QueryRequests;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editPage, fetchProducts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);