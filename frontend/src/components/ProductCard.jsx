import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyGetProductsQuery } from '../services/products';

const ProductCard = ({ search, category, sort, currentPage }) => {
  const [trigger, result] = useLazyGetProductsQuery();

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier, object-shorthand
    trigger({search: search, category: category, sort: sort, currentPage: currentPage});
    console.log(search);
  }, [search, category, sort, currentPage]);

  const { error, isLoading, data } = result;

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    // not sure of another way to avoid nested if/else.
    if (data.length === 0) {
      return <div>No Results</div>;
    }
    return data.products.map((product) => (
      <Link
        to={product._id}
        key={product._id}
        className="flex flex-col w-96 h-96 p-2 m-3 justify-center items-center border shadow rounded-md"
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
      </Link>
    ));
  }
};

ProductCard.propTypes = {
  search: PropTypes.string,
  category: PropTypes.string,
  sort: PropTypes.string,
  currentPage: PropTypes.number,
};

export default ProductCard;
