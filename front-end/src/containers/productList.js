import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import ReactPaginate from 'react-paginate';


class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    
  }

  

  // handleClick for pagination change

  handlePageClick = (data) => {
    console.log('clicked')
    let pageSelect = { page: data.selected + 1 };
    this.props.fetchProducts(pageSelect);
  };

  // query call for price and category selected 

    handleFilters = (e) => {
    e.preventDefault();
    let category =
      document.querySelector('#category').value === 'category'
        ? ""
        : document.querySelector('#category').value;
    let price =
      document.querySelector('#price').value === 'price'
        ? ""
        : document.querySelector('#price').value;
    let filterQuery = { category, price };
    console.log('inside container/productList ',filterQuery)
    this.props.fetchProducts(filterQuery);
  };

  render() {
    const { products, pages } = this.props;
    console.log('inside container/products.js - render() ' ,this.props) 
    return (

      // This section creates the two filter boxes and the submit button

      <div className="container justify-content-center">
        <div className="row filters justify-content-center">
          <form onSubmit={this.handleFilters, console.log(products)}>
            <select id="category" defaultValue="category" style={{marginRight: 10}}>
              <option value="category" hidden disabled>
                Select category
              </option>
              <option value="Automotive">Automotive</option>
              <option value="Baby">Baby</option>
              <option value="Beauty">Beauty</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Games">Games</option>
              <option value="Garden">Garden</option>
              <option value="Grocery">Grocery</option>
              <option value="Health">Health</option>
              <option value="Home">Home</option>
              <option value="Kids">Kids</option>
              <option value="Movies">Movies</option>
              <option value="Music">Music</option>
              <option value="Outdoors">Outdoors</option>  
              <option value="Shoes">Shoes</option>
              <option value="Sports">Sports</option>
              <option value="Tools">Tools</option>
              <option value="Toys">Toys</option>
            </select>
            <select id="price" defaultValue="price">
              <option value="price" hidden disabled>
                Sort by Price
              </option>
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>              
            </select>
            <button className="btn btn-primary btn-sm" type="submit" onClick={console.log('click') }>
              Filter
            </button>
          </form>
        </div>

        {/* This section creates all of the products listed on the page {product.image}  */ }  
       
        <div className="row products justify-content-center">
          {products &&
            products.map(product => (
              <div key={product._id} className="col-md-4">
                <div className="card my-3 shadow justify-content-center">
                  <img src="https://images.unsplash.com/photo-1530914547840-346c183410de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" style={{ width: '100%', height: '60%' }} alt="product" />
                  <div className="card-body" style={{background: '#eee'}}>
                    <h4 className="card-title">{product.name}</h4>
                    <p className="card-text">
                      <strong>Category: </strong>
                      {product.category}
                    </p>
                    <p className="card-text">
                      <strong>Price: </strong>${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* This section handles the pagination of the page */}

        { <div className="row pages">
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'page-link'}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination mx-auto'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            activeClassName={'active'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
          />
        </div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productsReducer.products,
  total: state.productsReducer.total,
  limit: state.productsReducer.limit,
  category: state.productsReducer.category,
  page: state.productsReducer.page,
  pages: state.productsReducer.pages
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

/*
https://images.unsplash.com/photo-1514218953589-2d7d37efd2dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80
https://images.unsplash.com/photo-1526887520775-4b14b8aed897?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80
https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=627&q=80
https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
https://images.unsplash.com/photo-1513116476489-7635e79feb27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1284&q=80
https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
https://images.unsplash.com/photo-1530914547840-346c183410de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80
*/

// import React, { Component } from 'react';
// import { connect } from 'react-redux';


// class NaturalMakeUpList extends Component {

//  renderNaturalMakeUp (makeUpData) {
//    let newMakeUpData = Object.values(makeUpData);
//    // Filter the data to check for products that are natural and not vegan
//    let natural = makeUpData.filter(m => m.tag_list.includes("Natural")&& !m.tag_list.includes("Vegan"))
//  console.log("natural", natural)
//      return (

//                 natural.map(m => ( 
//                     <div className="col-3 makeup-item text-center" key={m.id}>
//                       <img src={m.image_link} alt="" width="140" height="auto" className="rounded mx-auto d-block"></img>
//                       <div className="item-name">{m.name}</div>
//                       <div className="item-brand">{m.brand}</div>
//                       <div className="price">${parseFloat(m.price).toFixed(2)}</div>
//                       <button type="button" class="btn btn-outline-info"><a href={m.product_link} className="text-info">Buy it Now</a></button>
//                       </div>

//                 ))



//         )
//       }

// render() {
//     return (
//       <div id="main-view" className="container">
//       <h1 id="natural" className="text-left">Natural Products</h1>
//         <hr></hr>
//         <div className="row d-flex ">



//           {this.props.makeUp.map(this.renderNaturalMakeUp)}


//         </div>
//         </div>

//     );
//   }
// }

// function mapStateToProps({ makeUp }) {
//   console.log('makeup', {makeUp})
//   return { makeUp };
// }

// export default connect(mapStateToProps)(NaturalMakeUpList);
