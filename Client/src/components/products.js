import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';



class Products extends Component {

    render () {
        return (
            <div className="row row-cols-3">
                <div className = "container">
                <p className = "xs-cols-4">Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p>Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p>Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p className = "xs-cols-4">Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p>Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p>Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p className = "xs-cols-4">Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p>Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                <div className = "container">
                <p>Category: Product.Category</p> 
                <h4>$65</h4>
                <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg"/>
                <h4>Product.Name</h4>
                </div>
                </div>
        )
    }
}


function mapStateToProps({products}) {
  return { products};
}

export default connect(mapStateToProps)(Products);