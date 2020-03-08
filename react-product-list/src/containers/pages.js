import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editPage, fetchProducts} from '../actions/index';
import '../index.css';



function Pages (props){

  

  const onFormSubmit =function(event) {
    const queryPage = `page=${event.target.value}`
    props.editPage(queryPage)
    props.fetchProducts(props.QueryRequests)
  }

  const renderOneButton= function(){
    console.log('count', props.pages)
    let buttonsHTML = []
    for (let i=1; i<=props.pages; i++){
    buttonsHTML.push(<button className='button' type='onSubmit' onClick={onFormSubmit} key={i} value={i}>{i}</button>)
    }
    return(
      <div>{buttonsHTML}</div>
    )
  }

    return(
        <div className='pages'>
          {renderOneButton()}
        </div>
    )
  }


function mapStateToProps(state) {
  console.log('this is data from products', state)
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      editPage, fetchProducts
  }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Pages);