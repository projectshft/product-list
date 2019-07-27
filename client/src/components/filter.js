import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCategory } from '../actions';



// const colors = [ { category: 'Home', value: 'ff0000' },
// { category: 'Baby', value: '00ff00' },
// { category: '', value: '0000ff' }, 
// { category: 'Games', value: '0000ff' }, { category: 'Games', value: '0000ff' }
//  ]

class Filter extends Component {
    

    handleClick(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.props.addCategory(e.target.value);
    }



    render() {
        return (
            <button value= 'Home' onClick={this.handleClick.bind(this)}>
                Home
            </button>
        // <div>
        //     <form onSubmit={this.handleSubmit}>
        //       <label>Favorite Color</label>
        //       <Field
        //         name="favoriteColor"
        //         component={DropdownList}
        //         data={colors}
        //         valueField="value"
        //         textField="category"/>
        //     </form>
        // </div>
        )
    }
}




function mapDispatchToProps(dispatch) {
    return bindActionCreators ({addCategory}, dispatch)
}


export default connect (null, mapDispatchToProps)(Filter);