import React, { Component } from 'react';

class CategoryDropdown extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
     this.props.fetchCategoryList;
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
      <button> Menu item 1 </button>
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
export default CategoryDropdown;