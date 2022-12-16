import { Form } from 'react-router-dom';
import { useState } from 'react';
import { useAddProductMutation, useGetProductsQuery } from '../services/products';
import { buildURL } from '../helpers/buildURL';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const [addProduct, result] = useAddProductMutation();
  const { data } = useGetProductsQuery();

  if (data) {
    console.log(data);
  }

  const handleFormSubmit = () => {
    addProduct({ name, category, price, image });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-xl mb-4">Create New Product</div>
      <div className="w-96 bg-slate-400 p-5 rounded">
        <div className="flex flex-col mb-5">
          <label htmlFor="name">Product name</label>
          <input className="border" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="category">Product Category</label>
          <input
            className="border"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="price">Product Price</label>
          <input
            className="border"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="image">Product Image</label>
          <input className="border" name="image" value={image} onChange={(e) => setImage(e.target.value)} type="text" />
        </div>
        <button className="self-end bg-slate-400 px-2 py-1 my-3 w-full" type="submit" onClick={handleFormSubmit}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default NewProduct;
