import React, { Component } from 'react';

export default class PageNumber extends Component {
  render() {
    console.log('Inside Page Numbers, this.props= ', this.props)
    const pageNumber = this.props.page;
    return (
      <td onClick={this.onPageClick}>{pageNumber}</td>
    );
  }
}