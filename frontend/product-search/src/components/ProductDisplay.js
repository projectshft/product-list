import {useSelector} from 'react-redux';

const ProductDisplay = () => {
  const productList = useSelector((state) => state.products.productList);

  const renderProducts = () => (
    productList.map(product => (
      <div className='col-md-3'>
        <p>{product.name}</p>
      </div>
    ))
  )

  return (
    <div className="container">
      <h1>{renderProducts()}</h1>
    </div>
  )
};

export default ProductDisplay;