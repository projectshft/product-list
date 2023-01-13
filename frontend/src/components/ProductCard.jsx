import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ data, isLoading, error }) => {
  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return data.products.map((product) => (
      <Link
        to={`/products/${product._id}`}
        key={product._id}
        className="flex flex-col basis-1/3 flex-none p-2 mb-5 justify-center items-center border border-white hover:border hover:border-stone-200 transition ease-in-out duration-300 hover:scale-105 hover:shadow-sm"
      >
        <div>
          <img className="object-contain w-80 h-80" src={product.image} alt="product" />
          <div className="flex text-sm font-light justify-between w-full">
            <div className="flex flex-col">
              <div>{product.name}</div>
              <div>{product.category}</div>
            </div>
            <div>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'narrowSymbol',
              }).format(product.price)}
            </div>
          </div>
        </div>
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
