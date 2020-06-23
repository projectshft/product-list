// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchProducts } from '../actions/index';

// class SearchBar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { term: '' };

//     this.onInputChange = this.onInputChange.bind(this);
//    // this.onFormSubmit = this.onFormSubmit.bind(this);
//   }

//   onInputChange(event) {
//     this.setState({ term: event.target.value });
//     this.props.fetchProducts(this.state.term);
//   }


//   render() {
//     return (
//       <div className="search-bar">
//       <input
//         placeholder="search"
//         value={this.state.term}
//         onChange={event => this.onInputChange(event.target.value)}
//       />
//     </div>
//     );
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchProducts }, dispatch);
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(SearchBar);