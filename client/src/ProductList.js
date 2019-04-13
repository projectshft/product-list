import React, { Component } from 'react';

class ProductList extends Component {
  renderProducts() {
    const listItems = [];
    for (let i = 0; i < 9; i++) {
      listItems.push(
        <div key={i} className="col-lg-4 col-md-6 my-3">
          <div className="card shadow m-auto" style={{ width: '18rem' }}>
            <img
              src="https://picsum.photos/300"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button className="btn btn-primary btn-block">
                I don't do anything yet
              </button>
            </div>
          </div>
        </div>
      );
    }
    return listItems;
  }

  render() {
    return (
      <div className="container">
        <div className="row my-4">{this.renderProducts()}</div>
      </div>
    );
  }
}

export default ProductList;
