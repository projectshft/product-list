import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../actions";


function App() {
  
  const products = useSelector((state) => state.products);

  console.log('app products: ', 'state.products: ', products.products[0].products);

  const renderProducts = () => {
    const mappedProducts = products.products[0].products.map((product, i) => {
      let name = product.name
      let category = product.category
      let price = product.price
      let image = product.image
      return (
        <div class="col" key={i}>
        <div class="card">
          <img src={image} class="card-img-top" alt="..."/>
          <div class="card-body">
            <h3 class="card-title">{name}</h3>
            <h5 className="card-title">Price: {price}</h5>
            <p class="card-text">Category: {category}</p>
          </div>
        </div>
      </div>
      )
    })
    return (mappedProducts);
  }

  return (
    <div className="container" id="products-container">
      <div class="row row-cols-1 row-cols-sm-3 g-3">
        {/* renderProducts would be called here {renderProducts()} */}
        {renderProducts()}
        {/* <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://via.placeholder.com/250?text=Product+Image" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h3 class="card-title">Product Name</h3>
              <h5 className="card-title">Price: (price)</h5>
              <p class="card-text">Category: (category name)</p>
            </div>
          </div>
        </div> */}
    </div>
  </div>
  );
}

export default App;
