/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, CloseButton } from 'react-bootstrap';

import { fetchProducts } from '../actions';

const ProductGrid = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);

  const renderProducts = () => {
    if (products) {
      return products.map((item, i) => (
        <div className="col-4 card" key={i}>
          <div className="card-body">
            <div className="ps-3 pe-3 d-inline d-flex justify-content-between">
              <h6 className="text-muted">
                Category: <strong className="text-dark">{item.category}</strong>
              </h6>
              <h5 className="card-title text-right text-dark">${item.price}</h5>
            </div>
            <div className="mt-0">
              <img className="card-img p-3" src={item.image} alt="product" />
            </div>
            <h3 className="name text-dark">{item.name}</h3>
          </div>
        </div>
      ));
    }
    return (
      <tr>
        <td>No weather to show</td>
      </tr>
    );
  };

  return (
    <div id="gray" className="container-fluid">
      <div className="row g-3">{renderProducts()}</div>
    </div>
  );
};

export default ProductGrid;
