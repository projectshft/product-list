import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = ({productArray}) => {
  // const dispatch = useDispatch(); //useSelector?
  const productPiece = useSelector((state) => state.products);
console.log(productPiece, 'product piece');
  const render = productArray.map((product) => {
    return ( 
      <div key={product.name}>
        <Product price={product.price} category={product.category} image={product.image} name={product.name}/>
      </div>
    )
  })
  return (
    <div className='list-container'>
    {render}
    </div>
    );
}

export default ProductList;
//fetch the id for the perfect key