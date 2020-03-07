import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProducts} from '../actions/index';
import '../index.css';



class Pages extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.count)
    this.state = {
      pages:0
    }

    //this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  onFormSubmit(event) {
    const queryPage = `page=${event.target.value}`
    this.props.fetchProducts(queryPage)
  }

  renderOneButton(){
    let buttonsHTML = []
    for (let i=1; i<=this.props.pages; i++){
    buttonsHTML.push(<button className='button' type='onSubmit' onClick={this.onFormSubmit} value={i}>{i}</button>)
    }
    return(
      <div>{buttonsHTML}</div>
    )
  }

  render() {
    return(
        <div className='pages'>
          {this.renderOneButton()}
        </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchProducts
  }, dispatch);
}



export default connect(null, mapDispatchToProps)(Pages);