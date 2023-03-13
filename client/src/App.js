import './App.css';
import PriceProducts from './DropdownProducts';
import Products from './Products';
import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [priceProducts, setPriceProducts] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(0)

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i)

  useEffect(() => {
    getProducts()
  }, [pageNumber])
  
  async function getProducts() {
    try {
      const res = await axios.get(`http://localhost:3001/products?page=${pageNumber}`)
        const totalPages = res.data.totalPages
        setProducts(res.data.products)
        setNumberOfPages(totalPages)
    } catch (error) {
      alert(error.message)
    }
  }

  async function handlePriceClick(e) {
    if (e.target.innerHTML
      === 'Highest') {
      try {
        const res = await axios.get('http://localhost:3001/products?price=highest')
          setPriceProducts(res.data)
          setProducts(null)
      } catch (error) {
        alert(error.message)
      }
    } else if (e.target.innerHTML
      === 'Lowest') {
      try {
        const res = await axios.get('http://localhost:3001/products?price=lowest')
          setPriceProducts(res.data)
          setProducts(null)
      } catch (error) {
        alert(error.message)
      }
    }
  }

  async function handleCategoryClick(e) {
    if (e.target.innerHTML
      === 'Baby') {
      try {
        const res = await axios.get('http://localhost:3001/products?category=Baby')
          setPriceProducts(res.data)
          setProducts(null)
      } catch (error) {
        alert(error.message)
      }
    } else if (e.target.innerHTML === 'Music') {
      try {
        const res = await axios.get('http://localhost:3001/products?category=Music')
          setPriceProducts(res.data)
          setProducts(null)
      } catch (error) {
        alert(error.message)
      }
    } else if (e.target.innerHTML === 'Sports') {
      try {
        const res = await axios.get('http://localhost:3001/products?category=Sports')
          setPriceProducts(res.data)
          setProducts(null)
      } catch (error) {
        alert(error.message)
      }
    } else if (e.target.innerHTML === 'Shoes') {
      try {
        const res = await axios.get('http://localhost:3001/products?category=Shoes')
          setPriceProducts(res.data)
          setProducts(null)
      } catch (error) {
        alert(error.message)
      }
    } else if (e.target.innerHTML === 'Garden') {
      try {
        const res = await axios.get('http://localhost:3001/products?category=Garden')
          setPriceProducts(res.data)
          setProducts(null)
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <div className="App justify-content-center">
      <div className="navbar container-fluid justify-content-center">
        <div className="row">
          <div className="col-12 pe-4">
            <form>
              <div className="input-group">
                <input type="text" className="form-control" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="input-group">
              <div className="input-group-append">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</button>
                <div className="dropdown-menu" onClick={handleCategoryClick}>
                  <p className="dropdown-item">Baby</p>
                  <p className="dropdown-item">Sports</p>
                  <p  className="dropdown-item">Music</p>
                  <p className="dropdown-item">Garden</p>
                  <p className="dropdown-item">Shoes</p>
                </div>
              </div>
            </div>
          </div>
        
          <div className="col-6">
            <div className="input-group">
              <div className="input-group-append">
                <button 
                className="btn btn-outline-secondary dropdown-toggle" 
                type="button" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">Price</button>
                <div className="dropdown-menu" onClick={handlePriceClick}>
                  <p className="dropdown-item">Highest</p>
                  <p className="dropdown-item">Lowest</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Products products={products}/>
      <PriceProducts newProducts={priceProducts}/>
      <div className='text-center mt-4'>
        {pages.map((pageIndex) => (
          <button className="btn justify-content-center" key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
        ))}
      </div>
      
    </div>
  );
}

export default App;
