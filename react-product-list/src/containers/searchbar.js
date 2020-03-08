import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editSearch } from '../actions/index';
import { useState } from 'react';




//controls the search bar
function SearchBar(props) {

  //using hooks to save the search term as it is changed. 
  const [term, setSearchTerm] = useState('')

  //called when a new search option is searched
  const onFormSubmit = function (event) {
    //sends the search to the actions
    props.editSearch(`&search=${term}`)
  }

      return (
        <div className='col'>
          <form >
            <input onChange={event => setSearchTerm(event.target.value)} type="text" placeholder="Search"></input>
            <button className='search-btn' type='button' onClick={onFormSubmit}>Go!</button>
          </form>
        </div>
      )
    }

    function mapDispatchToProps(dispatch) {
      return bindActionCreators({
        editSearch
      }, dispatch);
    }

    export default connect(null, mapDispatchToProps)(SearchBar);