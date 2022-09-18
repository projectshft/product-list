import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../actions/index';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { product, setProduct } = useState('');

  useEffect(() => {
    dispatch(fetchProducts(product));
  });
  return (
    <form className="search">
      <input
        type="text"
        name="Product Search"
        id="name"
        className="search__text"
        placeholder="Search for a product"
        onChange={(e) => setProduct(e.target.value)}
        value={product}
      />
    </form>
  );
}
