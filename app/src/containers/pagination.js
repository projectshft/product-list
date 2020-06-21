import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import PageNumber from './page-numbers'

// in this component, the user will be able to click on a page number and see a new set of products render (if there is more than one page of products). Outgoing data will be page number (api call) but I'm thinking there won't be any incoming data because the product-container is what will be updated, not the pagination component
//this component should be passed the number of products or number of pages from the product container, keep it 'dumb', maybe only pass number of pages
class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    //the props is an object that contains the fetchPageNumber function

    this.state = { page: '' };

    this.onPageClick = this.onPageClick.bind(this);
    //this.showPageNumbers = this.showPageNumbers.bind(this);
  }

  onPageClick(event) {
    console.log('page click event.target= ', event.target.innerHTML)
    const page = event.target.innerHTML.toString();
    //console.log('page clicked', event.target.value)
    this.setState({ page: page }, () => {
      console.log('State inside onPageClick:', this.state)
       console.log('State inside onPageClick:', this.state.page)
      this.props.fetchProducts(this.state);
    });
   // console.log('State inside onPageClick:', this.state)
    //console.log('State inside onPageClick:', this.state.page)
    //this.props.fetchProducts(this.state.page);
   // this.setState({page: ''})
  }

  // showPageNumbers(pageCount) {


  // }

  render() {
    // look into just sending the number of pages vs product count to this component from product-container, to keep this component 'dumb'
    //const products = this.props.products;
    //const count = this.props.productCount;
    //const count = products.length;
    //this.showPageNumbers(count)
    console.log('Inside pagination component, this.props= ', this.props)
    const productsCount = this.props.products[1]
    console.log('Inside pagination component, this.props.products[1]= ', this.props.products[1])
    const pageNumbers = [];
    let pageNumber = 1;
    pageNumbers.push(pageNumber)
    for (let i = 1; i < productsCount; i++) {
      if (i % 9 === 0) {
        pageNumber++;
        pageNumbers.push(
          <PageNumber key={pageNumber} page={pageNumber} />
        )
      }
    }


    return (
      <table>
        <tbody><tr onClick={this.onPageClick} className="pages">{pageNumbers}</tr></tbody>
      </table>
    )
  }
}

{/* <div className="row text-center">
<span id="pageOne" className="col-md-2 pages" onClick={this.onPageClick}>1</span>
<span id="pageTwo" className="col-md-2 pages" onClick={this.onPageClick}>2</span>
<span id="pageThree" className="col-md-2 pages" onClick={this.onPageClick}>3</span>
<span id="pageFour" className="col-md-2 pages" onClick={this.onPageClick}>4</span>
<span id="pageFive" className="col-md-2 pages" onClick={this.onPageClick}>5</span>
<span id="pageSix" className="col-md-2 pages" onClick={this.onPageClick}>6</span>
<span id="pageSeven" className="col-md-2 pages" onClick={this.onPageClick}>7</span>
<span id="pageEight" className="col-md-2 pages" onClick={this.onPageClick}>8</span>
<span id="pageNine" className="col-md-2 pages" onClick={this.onPageClick}>9</span>
<span id="pageTen" className="col-md-2 pages" onClick={this.onPageClick}>10</span>
</div> */}

// the only action we're binding is fetchPage. This function is wrapped in a dispatch call and will dispatch an action to our reducer
// from this pagination component, we're invoking the fetchPage action creator every time the user clicks a page number, which calls our api to return the products for that page
// this is the component is receiving the fetchPage prop
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

// this component also needs to receive the number of products from the search, so it can render the appropriate number of pages at the bottom of the screen
// rethinking that this component doesn't need to receive the new products, only the product container component should be sent that data
function mapStateToProps({ products }) {
  console.log('Map state to props inside pagination', products);
  return { products };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);