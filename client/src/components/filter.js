import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { DropdownList } from 'react-widgets'
import { bindActionCreators } from 'redux';



const colors = [ { category: 'Home', value: 'ff0000' },
{ category: 'Baby', value: '00ff00' },
{ category: '', value: '0000ff' }, 
{ category: 'Games', value: '0000ff' }, { category: 'Games', value: '0000ff' }
 ]

class Filter extends Component {
    

    handleClick(e) {
        e.preventDefault();
        console.log(e);
    }



    render() {
        return (
            <button onClick={this.handleClick}>
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


function mapStateToProps(state) {
    return {products: state.products}
}


const filter = reduxForm({
    form: 'reactWidgets'
})(Filter)




export default connect (mapStateToProps)(filter);