// src/hooks/useProductId.js
import { useContext } from 'react';
import { ProductIdContext } from '../contexts/ProductIdContext';

const useProductId = () => {
  const { productId, setProductId } = useContext(ProductIdContext);
  return { productId, setProductId };
};

export default useProductId;
