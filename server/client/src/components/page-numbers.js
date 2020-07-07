import React, { Component } from 'react';

/* this component will simply return back a table data cell with only the information
   it needs (which is the page number)
*/   
export default class PageNumber extends Component {
  constructor () {
    super()
    
  }
  render() {
    const pageNumber = this.props.page;
    return (
      <td className="cell">{pageNumber}</td>
    );
  }
}