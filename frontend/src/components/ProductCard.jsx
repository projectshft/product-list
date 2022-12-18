import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReviewSnippet from './ReviewSnippet';

const ProductCard = ({ data, isLoading, error }) => {
  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    console.log(data);
    return data.products.map((product) => (
      <Link
        to={`/products/${product._id}`}
        key={product._id}
        className="flex flex-col w-80 h-96 p-2 mx-3 mb-3 justify-center items-center border "
      >
        <img src={product.image} alt="product" />
        <div>{product.name}</div>
        <div>{product.category}</div>
        <div>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'narrowSymbol',
          }).format(product.price)}
        </div>
        <ReviewSnippet />
      </Link>
    ));
  }
};

ProductCard.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default ProductCard;
