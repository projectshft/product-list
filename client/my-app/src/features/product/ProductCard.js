import { useSelector, useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { fetchProducts } from './productSlice';


const CardFrame = ({category, price, image, name, _id}) => {
  return (
    <Card key={_id} className="card" style={{margin: '1rem',  width: '15rem',       height: 'auto' }}>
      <Card.Title>Title: {name}</Card.Title>
      <Card.Subtitle>Category:{category} Price ${price}</Card.Subtitle>
      <Card.Img src={image} style={ {objectFit: 'cover'}}/>      
    </Card>
  );
}

const ProductCard = () => {
  const dispatch = useDispatch();
  const { products, currentPage } = useSelector(state => state.inventory);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  
const selectProducts = (currentPage) => {
  const a = 9 * (currentPage -1);
  const b = 9 * (currentPage -1) + 9;
  return products.slice(a, b);}
  const productsToDisplay = selectProducts(currentPage);
  
  return (
    <Container className='cardsContainer' fluid>
      <Row >
        { productsToDisplay.map((product) => (
            <CardFrame
            category = { product.category }
            price = { product.price }
            image = { product.image }
            name = { product.name }
            key = { product._id }
          />
          ))  
        } 
      </Row>
    </Container>
  )
}

export default ProductCard;
