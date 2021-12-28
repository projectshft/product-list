import {useSelector} from 'react-redux';

const ProductDisplay = () => {
  const productList = useSelector((state) => state.products.productList);

  return (
    <div className="container">
      <div className='row'>
        <div>{(
          productList.map(product => (
            <div className='col-md-3 product'>
              <p>Category: <strong>{product.category}</strong></p>
              <h3>Price: <strong>{product.price}</strong></h3>
              <img src="https://via.placeholder.com/250?text=Product+Image" alt=""></img>
              <h2><strong>{product.name}</strong></h2>
            </div>
          ))
        )}</div>
      </div>
    </div>
  )
};

export default ProductDisplay;