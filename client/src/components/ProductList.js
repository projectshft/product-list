import React from 'react';
import PropTypes from 'prop-types';


class ProductList extends React.Component {
    
  render () { 
    return (
      <div className="product-list"> 
        <h1>Product List</h1>
        <div className="products"> 
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
              </div>
              
                          
            ))
           
          }
          <br />
             
         </div>  
      </div>
    );
  }
}

ProductList.propTypes = {
  Products: PropTypes.arrayOf(PropTypes.shape(ProductList.propTypes)).isRequired
};


export default ProductList;


