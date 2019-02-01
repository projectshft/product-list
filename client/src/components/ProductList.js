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
              <div key={p.name} className="product">
               
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
           <Link to="/">page</Link>
        
       
      </div>
    );
  }
}

ProductList.propTypes = {
  Products: PropTypes.arrayOf(PropTypes.shape(ProductDetail.propTypes)).isRequired
};


export default ProductList;


