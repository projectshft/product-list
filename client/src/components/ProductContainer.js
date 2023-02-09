import { useSelector } from 'react-redux';
import Product from './Product';
import Container from 'react-bootstrap/Container';



const ProductContainer = () => {
  const { products } = useSelector((store) => store.page);

  if (products.length < 1)
  return (
    <h2>Error loading data</h2>
  );
  return <Container className="parent">

    
    <div> 
          {products.map((product) => {
            return <Product key={product.id} {...product} />
          }
          )}
          </div>  
             
     <footer>
      
     <button
          
          aria-label="Increment value"
          //onClick={() => dispatch(increment())}
        >
          +
        </button>
       
        <div>
        <h6>page </h6>
        </div>
        <button
          className="styles.button"
          aria-label="Decrement value"
          //onClick={() => dispatch(decrement())}
        >
          -
        </button>
      

     </footer>
    
  </Container> 
    





}


   
export default ProductContainer;

