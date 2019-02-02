import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ProductDetail from './ProductDetail';


class ProductList extends React.Component {
    
  render () { 
    return (
      <div className="products"> 
        <h1>Product List</h1>
    
          {          
            this.props.Products.map(p => (
              <div key={p._id} className="product">
               
                <img src="https://elections.unc.edu/files/2016/02/20150927_172818702_iOS.jpg" alt="Img" height="100" width="100" />
                <br />
                Name: {p.name}
                <br /> 
                Category: {p.category}
                <br />
                Price: {p.price} 
                <br />
                <Link to={`/product/${p._id}`}>Details</Link>              
              </div>
              
                          
            ))
           
          }
          <br />
          <span>
  
        
          <span><Link to="/products?page=1"> 1  </Link></span>
         
          <span><Link to="/products?page=2">  2  </Link></span>
          <span><Link to="/products?page=3">  3  </Link></span>
          <span><Link to="/products?page=4">  4  </Link></span>
          <span><Link to="/products?page=5">  5  </Link></span>
          <span><Link to="/products?page=6">  6  </Link></span>
          <span><Link to="/products?page=7">  7  </Link></span>
          <span><Link to="/products?page=8">  8  </Link></span>
          <span><Link to="/products?page=9">  9  </Link></span>
          <span><Link to="/products?page=10">  10  </Link></span>
      
          </span>
       
       
        
       
           
      </div>
    );
  }
}

ProductList.propTypes = {
  Products: PropTypes.arrayOf(PropTypes.shape(ProductDetail.propTypes)).isRequired
};


export default ProductList;


