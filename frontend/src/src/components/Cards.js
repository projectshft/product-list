import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import '../App.css';

const Cards = () => {
  let firstPageData = useSelector(({ product }) => product);
  let comboData = useSelector(({ combo }) => combo);

  // const productData = priceData.length ? priceData : pageData;
  const productData = comboData ? comboData : firstPageData;

  console.log(productData);
  const renderCards = () => {
    if (productData.length > 0) {
      return productData.map((prod) => (
        <div className='card' key={prod._id}>
          <div className='card-header'>
            Category: <strong>{prod.category}</strong>
            {prod.price}
          </div>
          <img className='card-img-top' src={prod.image} alt='Card image cap' />
          <div className='card-body'>
            <h5 className='card-title'>{prod.name}</h5>
          </div>
        </div>
      ));
    }
  };

  return <div className='card-deck'>{renderCards()}</div>;
};

export default Cards;
