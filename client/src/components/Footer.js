import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { paginateProducts } from '../actions'

class Footer extends Component {
  //create state for page number when clicked
  constructor() {
    super()
    this.state = { page: '' }

    this.page = this.onClick.bind(this)
  }

  onClick = e => {
    e.preventDefault()
    console.log('e.target.id:', e.target.id)
    this.setState({ page: e.target.id })
    console.log('this.state:', this.state)
    //fetch the correct products basd on page number
    this.props.paginateProducts(e.target.id)
  }
  render() {
    return (
      <div className="mt-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="1">
                1
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="2">
                2
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="3">
                3
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="4">
                4
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="5">
                5
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="6">
                6
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="7">
                7
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="8">
                8
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="9">
                9
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={this.onClick} id="10">
                10
              </button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  //make props available to Footer component
  return { products: state.products }
}

function mapDispatchToProps(dispatch) {
  //whenever paginatedProducts is called, the result should be passed to the reducer
  return bindActionCreators({ paginateProducts }, dispatch)
}

//Footer is stateful and available to other components
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
