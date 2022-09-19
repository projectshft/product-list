import PropTypes from 'prop-types';

export default function Product({ price, name, category, imageUrl }) {
  return (
    <div className="col">
      <div className="card h-100 text-center">
        <div className="row">
          <span className="col-md-8 card__category">
            Category: <strong>{category}</strong>
          </span>
          <span className="col-md-4 card__price">{price}</span>
        </div>
        <div className="card-body">
          <img src={imageUrl} alt={name} className="card-img-top" />
          <h3 className="product__name">{name}</h3>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
