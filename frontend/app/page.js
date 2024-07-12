'use client';

import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/slices/products';

export default function Home() {
  const dispatch = useDispatch();
  dispatch(fetchProducts());

  return <main />;
}
