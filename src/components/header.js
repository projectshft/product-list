import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import Dropdown from 'react-dropdown'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setQuery, filterCategory, sortByPrice} from '../actions/requestConfig';

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
    selectPriceSort = (option) => {
        this.props.sortByPrice(option.label);
    };
    // ======================== Dropdown function END ======================//

    onQueryInputChange = (searchValue) => {
        this.setState({ query: searchValue });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.setQuery(this.state.query);
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
    return bindActionCreators({setQuery, filterCategory, sortByPrice}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)