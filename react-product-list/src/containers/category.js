import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editCategory } from '../actions/index';

//controlls the Categories drop down
function CategoryFilters(props) {
  //when new option is clicked function is activated and changes the state of the query
  const onFormSubmit = function (event) {
    //sends the new category to actions
    props.editCategory(`&category=${event.target.value}`)
  }

  return (
    <div className='col'>
      <select onChange={onFormSubmit} className="custom-select custom-select-sm">
        <option value="" selected>Categories</option>
        <option value="Tools">Tools</option>
        <option value="Electronics">Electronics</option>
        <option value="Shoes">Shoes</option>
        <option value="Garden">Garden</option>
        <option value="Games">Games</option>
        <option value="Kids">Kids</option>
        <option value="Health">Health</option>
        <option value="Clothing">Clothing</option>
        <option value="Sports">Sports</option>
        <option value="Industrial">Industrial</option>
        <option value="Computers">Computers</option>
        <option value="Baby">Baby</option>
        <option value="Automotive">Automotive</option>
        <option value="Music">Music</option>
        <option value="Books">Books</option>
      </select>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editCategory
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategoryFilters);