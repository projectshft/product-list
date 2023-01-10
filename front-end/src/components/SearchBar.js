import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../helpers/fetchProducts';
import { getProducts } from '../actions';
// import { setPrice } from '../actions'

const SearchBar = ({page, setPage}) => {
    const [query, setQuery] = useState(null)
    const [item, setItem] = useState(null);
    const [sort, setSort] = useState(null)
    const [category, setCategory] = useState(null)
    const [isSearched, setIsSearched] = useState('')
    const [currentSortBy, setCurrentSortBy] = useState('default')
    const [currentPrice, setCurrentPrice] = useState('default')
    const dispatch = useDispatch()

    const handleSearch = async (e) => {
        console.log('searched', e.target.value)
        setIsSearched('yes')
        setItem(query)
    }

    const handleSortByPrice = async (e) => {
        console.log('sorted by price', e.target.value)
        setIsSearched('yes')
        setSort(e.target.value)
        setCurrentPrice(e.target.value)
    }

    const handleSortByCategory = async (e) => {
        console.log('sorted by category', e.target.value)
        setIsSearched('yes')
        setCurrentSortBy(e.target.value)
        setCategory(e.target.value)
        setPage(1)
    }

    const reloadProducts = async () =>{
      const productData = await fetchProducts(page, sort, category, item);
      console.log('got reloaded', page, sort)
      dispatch(getProducts(productData))
  }

  useEffect(()=>{
      reloadProducts();
  },[page, sort, category, item])

  const handleClearSearchClick = () => {
    setQuery('')
    setIsSearched(null)
    setItem(null)
    setSort(null)
    setCategory('default')
    setPage(1)
    setCurrentSortBy('default')
    setCurrentPrice('default')
  }


    return (
        <>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form className="m-3">
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search to find items..."
                    className="search-bar"
                    value={query}
                  />
                  <InputGroup.Text
                    onClick={handleSearch}
                    role="button"
                    type="submit"
                    className="btn btn-search search-bar-button"
                  >
                    Search
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Row className="pt-3">
                <Col md={4}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Select
                        onChange={(e) => handleSortByPrice(e)}
                        aria-label="Default select example"
                        value={currentPrice}
                      >
                        <option value="default">Sort By Price</option>
                        <option value="lowToHigh">
                          Low - High
                        </option>
                        <option value="highToLow">
                          High - Low
                        </option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Select
                        onChange={(e) => handleSortByCategory(e)}
                        aria-label="Default select example"
                        value={currentSortBy}
                      >
                        <option value='default' >Sort By Category</option>
                        <option value="Tools">
                          Tools
                        </option>
                        <option value="Health">
                          Health
                        </option>
                        <option value="Music">
                          Music
                        </option>
                        <option value="Beauty">
                          Beauty
                        </option>
                        <option value="Baby">
                          Baby
                        </option>
                        <option value="Movies">
                          Movies
                        </option>
                        <option value="Shoes">
                          Shoes
                        </option>
                        <option value="Toys">
                          Toys
                        </option>
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        {isSearched === 'yes' ? (
        <>
          <button className="btn btn-warning clear-search-results" onClick={handleClearSearchClick}>Clear Search Filters</button>
          </>
        ) : null}
        
      </>
    )
}

export default SearchBar;