import { useSelector } from 'react-redux';
import '../App.css';

const Cards = () => {
  const [firstPageData, productsData, countData] = useSelector((state) => [
    state.product,
    state.products.products,
    state.products.ProductCount,
  ]);

  const presentData = productsData ? productsData : firstPageData;

  const renderCards = () => {
    if (presentData.length > 0) {
      return presentData.map((prod) => (
        <div className='card' key={prod._id}>
          <div className='card-header d-flex justify-content-between align-items-center'>
            <span className='card-header-category'>
              Category: <strong>{prod.category}</strong>
            </span>
            <span className='card-header-price'>{prod.price}</span>
          </div>
          <img className='card-img-top' src={prod.image} alt='Card image cap' />
          <div className='card-body'>
            <h5 className='card-title'>{prod.name}</h5>
          </div>
        </div>
      ));
    }
  };

  return (
    <div>
      <div className='card-deck'>{renderCards()} </div>
    </div>
  );
};

export default Cards;
