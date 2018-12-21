import React, { Component } from 'react';

class ProductDetail extends Component {
  renderReviews() {
    return this.props.product.reviews.map(r => {
      return (
        <li key={r._id} className="list-group-item">
          <strong>{r.name}</strong> : {r.text}
        </li>
      );
    });
  }

  render() {
    if (!this.props.product) {
      return <div>Select a product to get started.</div>;
    }

    return (
      <div>
        <img src={`${this.props.product.image}`} alt="" />
        <h3>Details for {this.props.product.name}</h3>
        <p>Category: {this.props.product.category}</p>
        <p>Price: {this.props.product.price}</p>
        <h4>Reviews</h4>
        <ul>{this.renderReviews}</ul>
      </div>
    );
  }
}

export default ProductDetail;
