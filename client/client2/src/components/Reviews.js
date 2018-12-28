import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchProduct } from '../actions/getSingleProduct'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

export class Reviews extends Component {
  componentDidMount() {
    let ID = this.props.match.params.product
    if (ID) {
      this.props.fetchProduct(ID)
      console.log(this.props)
    }
  }

  renderStars = (reviewObj) => {
    let starRating = []
    for (let i = 0; i < reviewObj.rating; i++) {
      starRating.push(
        <FaStar />
      )
    }
    return starRating
  }

  renderReviews = () => {
    console.log(this.props)
    if (this.props.singleProduct.reviews) {
      console.log('rendering')
      return this.props.singleProduct.reviews.map(reviewItem => {
        return <div className="col-md-8 review-card">
          <div className="user">
            <h3>{reviewItem.username} </h3>
            <h5><span className="stars">{this.renderStars(reviewItem)}</span> / 10 </h5>
          </div>
          <hr />
          <p>{reviewItem.text}</p>
        </div>;
      })
    }
  }




  render() {
    let { singleProduct } = this.props
    return <div className="container">
      <Link to='/products'>Back</Link>
      <div className="jumbotron">
        <img className="reviewImg" src={`${singleProduct.image}`} alt="" />
        <h1 className="display-4">{singleProduct.name}</h1>
        <p className="lead">{singleProduct.category}</p>
        <hr className="my-4" />
        <p className="lead">$ {singleProduct.price}</p>
        <p className="lead">{singleProduct.description}</p>
      </div>
      <h2>Reviews:</h2>
      <div className="row">{this.renderReviews()}</div>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  singleProduct: state.singleProduct
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
