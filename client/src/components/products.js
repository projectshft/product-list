import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";
import ProductItem from './product-item';
import './styles.scss';

class HomePage extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
            search: '',
            filter: '',
            sort: ''
      };  
    }

    componentDidMount() {
      this.props.fetchProducts();
    }

    render() {
        const { products } = this.props
        console.log('from render', products)
      return (
          <div className='shop-page'>
            {/*products.map(({ _id, ...otherProductProps }) => (
              <ProductsPreview key={_id} {...otherProductProps} />
            ))*/}
            <div className='collection-preview'>
                <div className='preview'>
                  {products
                    .filter((item, idx) => idx < 4)
                    .map(({ _id, ...otherItemProps }) => (
                      <ProductItem key={_id} {...otherItemProps} />
                    ))}
                </div>
            </div>
          </div>
      );
    }
  }
  
  function mapStateToProps(  { products } ) {
    return  { products };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage);