import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/products';

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
      <div className="flex justify-center items-center h-screen">
        <div className="border h-96 flex p-5 rounded">
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
        <div className="flex flex-col w-80 h-96 border  rounded  p-5 ml-5">
          <div className="self-center">Reviews</div>
          <div>
            <div>UserName</div>
            <div>Review Text</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
