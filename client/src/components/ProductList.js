import React from 'react';
import PropTypes from 'prop-types';

class ProductList extends React.Component {
    
  render () { 
    return (
      //The first div class known as product-list is the title of the list and the second div class transforms the list from all going down to spreading out in three columns.
      <div className="product-list"> 
        <div className="products"> 
          {          
            this.props.Products.map(p => (
              //This returns the details of each product in the product list. It brings back the image, which is just one of me as well as the name, the category and the price of each product. 
              <div key={p._id} className="product"> 
               {/* //Here is the category and price of each individual product. */} 
              <font size="1"> Category: {p.category}</font>     ${p.price} 
                <br />             
                <img src="https://elections.unc.edu/files/2016/02/20150927_172818702_iOS.jpg" alt="Img" height="125" width="125" />
                <br />
                {/* //Here is the name of each individual product. */}
                {p.name}
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


