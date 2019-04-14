import React, { Component } from 'react'
import { fetchProducts } from '../actions'

class Footer extends Component() {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = { page: '' }

    const onClick = e => {
      console.log('e.target.id:', e.target.id)
      this.setState({ page: e.target.id })
      console.log('this.state:', this.state)
      fetchProducts(e.target.id)
    }
  }
  render() {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                4
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                5
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                6
              </a>
            </li>
            <li className="page-item">
              <a class="page-link" onClick={this.onClick.bind(this)} href="#">
                7
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                8
              </a>
            </li>
            <li className="page-item">
              <a class="page-link" onClick={this.onClick.bind(this)} href="#">
                9
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={this.onClick.bind(this)}
                href="#"
              >
                10
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Footer
