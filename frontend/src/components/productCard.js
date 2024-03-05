import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "./pagination";
import axios from "axios";
import { setCurrentPage } from "../slices/paginationSlice";
//This component displays product cards based on searches and filtering
const ProductsComponent = ({ searchTerm, category, price }) => {

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  //Fetching products when the dependencies change and constructing query parameters based on current state
  useEffect(() => {

    let fetchUrl = 'http://localhost:8000/products';
    const params = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage
    });
    //Appending searchTerm, category and price to the query if they exist
    if (searchTerm) params.append('query', searchTerm);
    if (category) params.append('category', category);
    if (price) params.append('price', price);

    fetchUrl += `?${params.toString()}`
    //Fetching products from the server and setting products and totat number of products based on response
    axios.get(fetchUrl)

      .then(response => {
        setProducts(response.data.products);
        setTotal(response.data.total)
        console.log(response.data)
      })

      .catch(error => console.error('Error fetching products:', error));
  }, [searchTerm, category, price, currentPage, itemsPerPage]);


  return (

    <div className="main-content container-lg my-5">
      <div className="row justify-content-center">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={product.id || index} className="col-md-4 mb-4">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6>Category: <strong>{product.category}</strong></h6>
                  <h3>{product.price}</h3>
                </div>
                <img src="https://via.placeholder.com/250?text=Product+Image" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title"> <strong>{product.name}</strong> </h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center flex-column align-items-center">
            <img src="https://pujanmart.com/images/no-product-found.png" alt="No Products Found" />
            <h6 className="text-center mt-3"> <strong>Please try your search again</strong></h6>
          </div>

        )}
        <div className="d-flex justify-content-center pagination-container">
          <nav aria-label="Page navigation example">
            <PaginationComponent
              totalItems={total}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductsComponent;