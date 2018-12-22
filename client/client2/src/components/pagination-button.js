import React, { Component } from 'react'

class PaginationButton extends Component {
  render() {
    return (
      <div className="pag-btn col-xs-1">
        <h1>{this.props.number}</h1>
      </div>
    )
  }
}

export default PaginationButton
