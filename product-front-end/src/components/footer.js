import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { populateProducts, getCount, setPage, fetchProducts } from '../actions'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: this.props.query.page
    }

    this.handlePageChange = this.handlePageChange.bind(this);


    this.props.getCount(this.props.query).then(response => {
      if (this.props.count < 100) {
        this.props.populateProducts()
      }
    })
  }

  handlePageChange(page,event) {
    if (event) {
      event.preventDefault()
    }
    if (page < 1) {
      page = 1
    }
    else if (page > this.props.pages.length) {
      page = this.props.pages.length
    }
    this.setState({page: parseInt(page, 10)}, () => {
      this.props.setPage(this.state.page)
      this.props.fetchProducts(this.props.query).then(response => {
        this.props.getCount(this.props.query)
      })
    })
  }

  componentWillReceiveProps() {
    if (this.props.query.page !== this.state.page) {
      this.handlePageChange(this.props.query.page)
    }
  }

  render() {
    return (
      <div className="mb-5">
        <nav className="my-3" aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button className="page-link" onClick={(event)=>{this.handlePageChange(this.props.query.page-1, event)}} href="#" aria-label="Previous">
                &laquo;
              </button>
            </li>
            {
              this.props.pages.map((page, i) => {
                return(
                  <li key={i} className={this.state.page === i+1 ? 'active page-item':'page-item'}><button className="page-link" href="#" onClick={(event)=>{this.handlePageChange(i+1,event)}}>{i+1}</button></li>
                )
              })
            }
            <li className="page-item">
              <button onClick={(event)=>{this.handlePageChange(this.props.query.page+1,event)}} className="page-link" href="#" aria-label="Next">
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products, query: state.query, pages: state.pages, count: state.count };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ populateProducts: populateProducts, getCount: getCount, setPage: setPage, fetchProducts:fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
