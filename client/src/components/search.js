import React, { useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { productSearch} from '../actions/index';

function Search(props){
    console.log('from search props: ', props)
    const [searchVal, setSearch] = useState('')

    let getProductsByName = () => {    
        console.log('from search searchValue: ', searchVal)      
        props.productSearch(`&name=${ searchVal }`)
    }
    
    return (
        <div className='col'>
            <input id="search" onChange={e => setSearch(e.target.value)}></input>
            <button id="subButton" type="button" className="btn btn-light" onClick={getProductsByName()} >Search</button>
        </div>
    )
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(Search);
