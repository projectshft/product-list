import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import Dropdown from 'react-dropdown'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPage, setQuery, filterCategory, sortByPrice} from '../actions/requestConfig';
import {fetchProducts} from '../actions/fetch';

// Drop down variables.
const priceSortOptions = ["No Sorting","Lowest","Highest"];

// ===================== Auto Suggest helper functions ================//
// https://github.com/moroshko/react-autosuggest //
const categories = ["Books", "Movies", "Music", "Games", "Electronics", "Computers", 
                    "Home", "Garden", "Tools", "Grocery", "Health", "Beauty", "Toys", 
                    "Kids", "Baby", "Clothing", "Shoes", "Jewelry", "Sports", "Outdoors", 
                    "Automotive", "Industrial"];
  
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
  
const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {return [];}  
    const regex = new RegExp('^' + escapedValue, 'i');

    return categories.filter(category => regex.test(category));
}
  
const getSuggestionValue = (suggestion) => {return suggestion;}
  
const renderSuggestion = (suggestion) => {
    return (
        <span>{suggestion}</span>
    );
}
// ===================== Auto Suggest functions END ================//

//========================== Header Component ======================//
class Header extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        suggestions: [],
        query: ''
      };    
    }
    
    // ===================== More Auto Suggest functions ================//
    onChange = (event, { newValue, method }) => {
      this.props.filterCategory(newValue);
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
    // ===================== Auto Suggest functions END ================//

    // ======================== Dropdown function ======================//
    // setting sort option to redux state
    selectPriceSort = (option) => {
        this.props.sortByPrice(option.label);
    };
    // ======================== Dropdown function END ======================//

    onQueryInputChange = (searchValue) => {
        this.setState({ query: searchValue });
    }

    submitHandler = async (event) => {
        event.preventDefault();
        this.props.setPage(1);
        // Made this an async function, because query is saved at 2 places.
        // 1) this component, 2) this props 
        // This prevent user from sending this.state.query unintentionally, 
        // when clicking on page 2 after modifying search bar, but not submitting it
        // so there's a redux state, to keep track of the original query
        await this.props.setQuery(this.state.query);
        this.props.fetchProducts(this.props.requestConfig);
    }
  
    render() {
      const { suggestions } = this.state;
      const inputProps = {
        placeholder: "Filter By Category",
        value: this.props.requestConfig.category,
        onChange: this.onChange
      };
  
      return (
          <div className="header-container">
                <div className="header-title row justify-content-center">
                    <h1 className="text-center">Products</h1>
                </div>
                <div className="row justify-content-center">

                    {/* Search Bar */}
                    <div className="col-md-6 text-center">
                        <form onSubmit={this.submitHandler}>
                            <input
                                className="search-bar"
                                type="text" 
                                onChange={event => this.onQueryInputChange(event.target.value)} 
                                placeholder="Search Products"/>
                            <button className="btn-primary custom-search-button"type="submit">Search</button>
                        </form>
                    </div>

                    {/* Auto Suggest for Category */}
                    <div className="col-md-3 justify-content-center">
                        <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps} />
                    </div>

                    {/* Drop down for price sorting */}
                    <div className="col-md-3 justify-content-center">
                        <Dropdown options={priceSortOptions} onChange={this.selectPriceSort} value={this.props.requestConfig.sortPrice} placeholder="Sort by Price" />
                    </div>
                </div>
          </div>


      );
    }
  }
  
  function mapStateToProps({requestConfig}){
    return {requestConfig}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setPage, setQuery, filterCategory, sortByPrice, fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)