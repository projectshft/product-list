import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editPrice } from '../actions/index';



//controls the price drop down
function PriceSort(props) {
  //called when a new price option is changed
  const onFormSubmit = function (event) {
    //sends the price sorting to the actions
    props.editPrice(`&price=${event.target.value}`)
  }

  return (
    <div className='col'>
      <select onChange={onFormSubmit} class="custom-select custom-select-sm">
        <option value="" selected>Price</option>
        <option value="Highest">Highest to Lowest</option>
        <option value="Lowest">Lowest to Highest</option>
      </select>
    </div>
  )
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editPrice
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(PriceSort);