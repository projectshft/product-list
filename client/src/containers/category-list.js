import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchCategories } from "../actions";

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);

    this.state= [
      this.showMenu = false
    ]

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

}

  componentDidMount() {
    this.props.fetchCategories
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  renderCategories(){
    const {categories} = this.props
    console.log( 'categories are ' + categories);
    return categories.map((category) =>{
      <button> {category} </button>
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          Show menu
        </button>

        {
          this.state.showMenu
            ? (
              <div className="menu">
                {this.renderCategories}
              </div>
            )
            : (
              null
            )
        }
      </div>
    )
  }

 }
 
function mapStateToProps({ categories }) {
  //whatever is returned will show up as props inside of ProductList
  console.log("state in mapstatetoprops in the categories list component", { categories })
  return { categories };
}

//Anything returned from this function will end up as props on the ProductList container
const mapDispatchToProps = (dispatch) => {
  //whenever fetchProducts is called the result should be passed to all of our reducers
  return bindActionCreators({ fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)