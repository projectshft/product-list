import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchProducts, searchProducts, setCategory, setSort, setPage, selectProduct } from '../actions';

const ProductsIndex = () => {
  let products = useSelector((state) => state.products.products);
  let page = useSelector((state) => state.products.pageSelected);
  let category = useSelector((state) => state.products.categorySelected);
  let sort = useSelector((state) => state.products.sortSelected);
  let query = useSelector((state) => state.products.query);
  let totalProducts = useSelector((state) => state.products.totalProductsReturned);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(page, category, sort, query));
  }, [page, category, sort, query, dispatch]);

  function renderProducts () {

    if (products.length > 0) {
      return (
        <Row xs={1} md={3} className="g-5">
          {Array.from({ length: 1 }).map((_, idx) => (
          <>
            {products.map((product) => (
              <Link 
              to={`/products/${product._id}`} 
              style={{textDecoration:'none'}}
              key = {product._id}
              onClick = {() => dispatch(selectProduct(product._id))}
              >
                <Card className="h-100">
                  <Card.Img src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <small className="text-muted">{product.category}</small>
                    <Card.Text className="text-right">${product.price}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    
                    <Card.Text className="text-muted">{product.reviews.length} reviews</Card.Text>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
          </>
          ))}
        </Row>
      )
    }
    return (
    <>
      <Card>
        <Card.Body className="text-center">
          Sorry, we couldn't find any products matching "{query}". <br />
          Please try again.
        </Card.Body>
        <Button
            variant="secondary"  
            onClick={() => {
              dispatch(searchProducts({query: ' '}));
            }
            }
          >
          Back
        </Button>

      </Card>
    </>
    )
  }

  function renderResetButton () {
    return (
      <Button
      variant="secondary"  
      onClick={() => {
        dispatch(searchProducts({query: ' '}));
        dispatch(setCategory('All Products'));
        dispatch(setSort(' '));
      }}>
      Reset Filters
    </Button>
    )
  }

  function renderSortButton () {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Sort by
        </Dropdown.Toggle>
      
        <Dropdown.Menu>
          <Dropdown.Item 
            onClick={() => {
              dispatch(setSort(' '));
            }}>
            Featured
          </Dropdown.Item>

          <Dropdown.Item 
            onClick={() => {
              dispatch(setSort('lowest'));
            }}>
            Price: Lowest to Highest
          </Dropdown.Item>
          
          <Dropdown.Item 
            onClick={() => {
              dispatch(setSort('highest'));
            }}>
            Price: Highest to Lowest</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  function renderPageLinks () {
    const numPages = Math.ceil(totalProducts/9);
    const pageArray = Array.from({length: numPages}, (_, i) => i + 1);
    if (numPages > 1) {
      return (
        <>
        {pageArray.map((pageNum, i) => (
          <Button
              variant="outline-secondary"
              className="page-buttons"  
              key ={i}
              onClick={() => {
                dispatch(setPage(pageNum));
              }
              }
            >
            {pageNum}
            </Button>
          ))}
        </>
      )
    }
  }

  return (
    <div>
      <div className="text-xs-right">
      </div>
      <h6 className="text-right sort-btn"> {renderSortButton()}</h6>
      
      <ul className="list-group">
        {renderProducts()}
        </ul>
        <br /> 
        <div className="center">{renderPageLinks()} {renderResetButton()}</div>
        <br />

      <br /> <br />

    </div>
  );
};

export default ProductsIndex;