import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, savePage} from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';

class Page extends Component {
  constructor() {
    super()
    this.state = { page: '' }
    this.page = this.handleClick.bind(this)
  }

    handleClick(e) {
      e.preventDefault()
      this.setState({ page: e.target.id })
      this.props.fetchProducts(e.target.id)
    }


    render() {
      return (
        <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="1">1</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="2">2</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="3">3</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="4">4</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="5">5</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="6">6</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="7">7</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="8">8</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="9">9</button></li>
              <li className="page-item"> <button className="page-link" onClick={this.onClick} href="10">10</button></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
  


  function mapStateToProps(state) {
    return {products: state.products, category: state.category, sort: state.sort}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({fetchProducts, savePage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)