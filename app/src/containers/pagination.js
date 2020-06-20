import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

// in this component, the user will be able to click on a page number and see a new set of products render (if there is more than one page of products). Outgoing data will be page number (api call) but I'm thinking there won't be any incoming data because the product-container is what will be updated, not the pagination component
//this component should be passed the number of products or number of pages from the product container, keep it 'dumb', maybe only pass number of pages
class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    //the props is an object that contains the fetchPageNumber function

    this.state = { page: '' };

    this.onPageClick = this.onPageClick.bind(this);
  }

  onPageClick(event) {
    this.setState({page: event.target.value});
    this.props.fetchProducts(this.state.page);
  }

  renderPages(count) {
    if (count <= 9 ) {
      return <div className="col-md-2 pages"><span> className="col-md-2"1</span></div>
    } else if (count <= 18) {
      return <div className="col-md-2 pages"><span className="col-md-2 pages">1</span><span className="col-md-2 pages">2</span></div>
    } else if (count <= 27) {
      return <div className="col-md-2 pages"><span className="col-md-2 pages">1</span><span className="col-md-2 pages">2</span><span className="col-md-2">3</span></div>
    } else {
      return <div><span>Need more pages</span></div>
    }
    
  }

  render() {
    // look into just sending the number of pages to this component from product-container, to keep this component 'dumb'
    //const products = this.props.products;
    const count = this.props.pageCount;
    //const count = products.length;
    return(
      <div className="row text-center">{this.renderPageNumbers(count)}</div>
    )
  }
}

// the only action we're binding is fetchPage. This function is wrapped in a dispatch call and will dispatch an action to our reducer
// from this pagination component, we're invoking the fetchPage action creator every time the user clicks a page number, which calls our api to return the products for that page
// this is the component is receiving the fetchPage prop
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

// this component also needs to receive the number of products from the search, so it can render the appropriate number of pages at the bottom of the screen
// rethinking that this component doesn't need to receive the new products, only the product container component should be sent that data
// function mapStateToProps({ productCount }) {
//   console.log('Map state to props', productCount);
//   return { productCount };
// }

export default connect(null, mapDispatchToProps)(PaginationComponent);