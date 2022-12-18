import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ProductReviews from '../components/ProductReviews';
import { useGetProductByIdQuery, useAddReviewByProductIdMutation } from '../services/products';

const Product = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(productId);

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (data) {
    return (
      <>
        <Header />
        <div className="flex justify-center h-screen">
          <div className="container">
            {/* Product Section */}
            <div className="border h-96 flex justify-center p-5 rounded">
              <div className="flex">
                <img src={data.image} alt="product" />
                <div className="flex flex-col pl-5">
                  <div className="self-end text-xl pb-5">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      currencyDisplay: 'narrowSymbol',
                    }).format(data.price)}
                  </div>
                  <div className="font-bold text-2xl">{data.name}</div>
                  <div>Category: {data.category}</div>
                </div>
              </div>
            </div>
            <ProductReviews productId={productId} />
          </div>
        </div>
      </>
    );
  }
};

export default Product;
