import React from 'react';
import { Component } from 'react';

export default class PaginationComponent extends Component {

  renderPages(count) {
    if (count <= 9 ) {
      return <div className="col-md-2 pages"><span> className="col-md-2"1</span></div>
    } else if (count <= 18) {
      return <div className="col-md-2 pages"><span className="col-md-2 pages">1</span><span className="col-md-2 pages">2</span></div>
    } else if (count <= 27) {
      return <div className="col-md-2 pages"><span className="col-md-2 pages">1</span><span className="col-md-2 pages">2</span><span className="col-md-2">3</span></div>
    } else {
      return <div><span>Need more pages</span></div>
    }
    
  }

  render() {
    const products = this.props.products;
    const count = products.length;
    return(
      <div className="row text-center">{this.renderPages(count)}</div>
    )
  }
}