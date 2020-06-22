import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';


class SearchFilterSortBar extends Component {
  constructor(props) {
    super(props);
    
    //the props is an object that just contains the fetchProducts function

    //the state will contain our user search input, category selection and/or price sort selection
    this.state = {page: '1', search: '', category: '', price: '' };
   

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onPriceSortSelect = this.onPriceSortSelect.bind(this);
  }

  /* When this component is initialized by main-page.js, we will use this React function
     to complete an initial search with empty query string, therefore all products will
     be returned and all pages shown when the application initially loads
  */   
  componentDidMount() {
    this.props.fetchProducts(this.state);
  }

  /* When the user types in a search term, the state will be updated with the term, but
     the api/DB won't be called yet
  */   
  onInputChange(event) {
    this.setState({ search: event.target.value });
    event.preventDefault();
  }

  onSearchButtonClick(event) {
    event.preventDefault();

    /* This will fetch the products from the search input. The state at this point is
     already updated from event handler of the user typing, so we invoke the fetchProducts 
     function on user hitting enter
    */ 
    this.props.fetchProducts(this.state);
    
  }

  /* this will update the state if the user selects a category. Then the fetchProducts
   function will make the api call for the selected category's products
  */ 
  onCategorySelect(event) {
    this.setState({ category: event.target.value }, () => {
      this.props.fetchProducts(this.state);
  })
  event.preventDefault();
}

  /* this will update the state if the user selects a price sort option (highest to
     lowest, and vice versa)
  */ 
  onPriceSortSelect(event) {
    this.setState({ price: event.target.value }, () => {
      this.props.fetchProducts(this.state);
    });
  
   event.preventDefault();
  }
  


  render() {
    return (
      <form className="form-inline search-bar">
        <label className="ml-2 mr-2" htmlFor="exampleFormControlInput1">Search</label>
        <input value={this.state.search} onChange={this.onInputChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search..." />
        <button onClick={this.onSearchButtonClick} type="submit" className="btn btm-primary">Search</button>
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectCategory">Filter by Category: </label>
        <select onChange={this.onCategorySelect} className="form-control custom-select" id="inlineFormCustomSelectCategory">
          <option defaultValue="All">All</option>
          <option value="Baby">Baby</option>
          <option value="Books">Books</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothing">Clothing</option>
          <option value="Tools">Tools</option>
          <option value="Kids">Kids</option>
          <option value="Home">Home</option>
          <option value="Garden">Garden</option>
          <option value="Automotive">Automotive</option>
          <option value="Toys">Toys</option>
          <option value="Beauty">Beauty</option>
          <option value="Computers">Computers</option>
          <option value="Sports">Sports</option>
          <option value="Shoes">Shoes</option>
          <option value="Games">Games</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Electronics">Electronics</option>
          <option value="Industrial">Industrial</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="Health">Health</option>
          <option value="Outdoors">Outdoors</option>
        </select>
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectSort">Sort by Price: </label>
        <select onChange={this.onPriceSortSelect} className="form-control custom-select" htmlFor="inlineFormCustomSelectSort">
          <option defaultValue="Sort Type">Sort Type</option>
          <option value="Highest">Price: Low to High</option>
          <option value="Lowest">Price: High to Low</option>
        </select>
      </form>
    );
  }
}

/* the only action we're binding is fetchProducts. This function is wrapped in a dispatch
 call and will dispatch an action to our reducer. we're invoking the fetchProducts action
 creator every time the user submits the search input, chooses a category or chooses a 
 price sort. */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

/* We pass in null (placeholder) as the first connect argument because we're only
 dispatching from this component. There is no mapStateToProps because we're not displaying 
 any data in this component
*/ 
export default connect(null, mapDispatchToProps)(SearchFilterSortBar);