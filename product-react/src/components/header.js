import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setCategory, setSort, submitQuery} from '../actions'

class Header extends Component{
    constructor(props){
        super(props)

        this.state = {
            category: null,
            sort: null,
            query: ''
        }
    }

    renderDropdown = () => {
        let buttonValues = ['tools','electronics','home', 'grocery', 'clothing']
        let buttonArray = buttonValues.map((value) => {
            return (
                <MenuItem key={Math.random()} onClick={() => {this.props.setCategory(value)}}>{value}</MenuItem>
            )
        })
        return buttonArray
        
    }

    render(){
        return(
            <div className="row">
                <div className="container justify-text-center justify-content-center">
                    <div className="form-group col-xs-4">
                        <input onChange={event => this.setState({query: event.target.value})} value={this.state.query} className='form-control' type="text"/>
                        </div>
                        <div className="col-xs-2">
                        <button type="button" className="submit btn btn-primary" onClick={() => {this.props.submitQuery(this.props.menu.category, this.props.menu.sort)}}>Submit</button>
                    </div>
                <div className="col-xs-3">
            <DropdownButton
                title={this.props.menu.category}
                key={Math.random()}
                id='categories'
            >
                {this.renderDropdown()}
            </DropdownButton>
            </div>
            <div className="col-xs-3">
            <DropdownButton
            title={this.props.menu.sort}
            key={Math.random()}
            id="sort"
            >
            <MenuItem key={Math.random()} onClick={() => {this.props.setSort('highest')}}>Price: highest to lowest</MenuItem>
            <MenuItem key={Math.random()} onClick={() => {this.props.setSort('lowest')}}>Price: lowest to highest</MenuItem>
            </DropdownButton>
            </div>
            </div>
           </div> 
        )
    }
}

function mapStateToProps({menu}){
    return {menu}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setCategory, setSort, submitQuery}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)