import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { populateProducts, getCount, setPage, fetchProducts } from '../actions'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

class Footer extends Component {
  constructor(props) {
    super(props)

    this.props.getCount().then(response => {
      if (this.props.count < 100) {
        console.log("getting products")
        this.props.populateProducts()
      }
    })
  }

  render() {
    return (
      <div className="mb-5">
        <nav className="my-3" aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {
              this.props.pages.map((page, i) => {
                return(
                  <li key={i} className="page-item"><a className="page-link" href="#" onClick={()=>{this.props.setPage(i)}}>{i+1}</a></li>
                )
              })
            }
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { products: state.products, query: state.query, pages: state.pages };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ populateProducts: populateProducts, getCount: getCount, setPage: setPage, fetchProducts:fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
