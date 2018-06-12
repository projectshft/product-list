import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCategory, setSort, submitQuery } from '../actions'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: null,
            sort: null,
            query: ''
        }
        this.props.submitQuery(this.props.menu.category, this.props.menu.sort)
    }

    renderDropdown = () => {
        let buttonValues = ['Tools', 'Electronics', 'Home', 'Grocery', 'Clothing', 'Outdoors', 'Music', 'Automotive', 'Sports', 'Select Category']
        let buttonArray = buttonValues.map((tag) => {
            return (
                <MenuItem key={buttonValues.indexOf(tag)} onClick={() => { this.props.setCategory(tag) }}>{tag}</MenuItem>
            )
        })
        return buttonArray

    }

    render() {
        return (
            <div className="row">
                <div className="container justify-text-center justify-content-center">
                    <div className="form-group col-xs-4">
                        <input onChange={event => this.setState({ query: event.target.value })} value={this.state.query} className='form-control' type="text" />
                    </div>
                    <div className="col-xs-2">
                        <button type="button" className="submit btn btn-primary" onClick={() => { this.props.submitQuery(this.props.menu.category, this.props.menu.sort) }}>Submit</button>
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
                            <MenuItem key={'highest'} onClick={() => { this.props.setSort('Highest') }}>Price: highest to lowest</MenuItem>
                            <MenuItem key={'lowest'} onClick={() => { this.props.setSort('Lowest') }}>Price: lowest to highest</MenuItem>
                            <MenuItem key={'Sort'} onClick={() => { this.props.setSort('Select-Sort') }}>Select Sort</MenuItem>
                        </DropdownButton>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ menu }) {
    return { menu }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setCategory, setSort, submitQuery }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)