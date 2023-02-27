import Product from './Product';

const ProductList = ({productArray}) => {
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