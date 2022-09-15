import { useSelector } from 'react-redux';
import '../App.css';

const Cards = () => {
  const [firstPageData, comboData, countData] = useSelector((state) => [
    state.product,
    state.combo.products,
    state.combo.ProductCount,
  ]);

  const productData = comboData ? comboData : firstPageData;

  const renderCards = () => {
    if (productData.length > 0) {
      return productData.map((prod) => (
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
      <div>
        {comboData ? (
          <div style={{ textAlign: 'center' }}>
            You have {countData} results on this page
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Cards;
