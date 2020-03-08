import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        }
        //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            filtered: this.props
        });
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps
        });
    }

    // handleChange = (e) =>  {
    //     // Variable to hold the original version of the product list
    //     let currentList = [];
    //     // Variable to hold the filtered list before putting into state
    //     let newList = [];
    //     // If the search bar isn't empty
    //     if (e.target.value !== "") {
    //             // Assign the original list to currentList
    //         currentList = this.props;
    //         // Use .filter() to determine which items should be displayed
    //         // based on the search terms
    //         newList = currentList.filter(item => {
    //             // change current item to lowercase
    //             const lc = item.toLowerCase();
    //             // change search term to lowercase
    //             const filter = e.target.value.toLowerCase();
    //             // check to see if the current list item includes the search term
    //             // If it does, it will be added to newList. Using lowercase eliminates
    //             // issues with capitalization in search terms and search content
    //             return lc.includes(filter);
    //         });
    //     } else {
    //         // If the search bar is empty, set newList to original list
    //         newList = this.props;
    //     }
    //     // set the filtered state based on what our rules added to newList
    //     this.setState({ filtered: newList} );
    // }

    render() {
        const { products } = this.props
        return (
            <div className='col'>
                <input></input>
                <button type="button" className="btn btn-light">Search</button>
            </div>
        )
    }
}

export default Search;

//onClick={/*this.handleChange()*/}