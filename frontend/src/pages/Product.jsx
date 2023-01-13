import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import Header from '../components/Header';
import ProductReviews from '../components/ProductReviews';
import ConfirmationModal from '../components/ConfirmationModal';
import { useGetProductByIdQuery, useDeleteProductByIdMutation } from '../services/products';

const Product = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState('');

  const [deleteProduct] = useDeleteProductByIdMutation();

  const navigate = useNavigate();

  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 12,
      min: 4,
    },
  });

  useEffect(() => {
    setDescription(lorem.generateSentences(3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConfirm = async () => {
    const result = await deleteProduct(productId);
    if ('error' in result) {
      console.log('error');
      // add popup to UI that an error occurred
    } else {
      navigate(-1);
    }
  };

  const onDeny = () => {
    setOpenModal(false);
  };

  const onDelete = () => {
    setOpenModal(true);
  };

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
          <div className="container flex flex-col items-center">
            {/* Product Section */}
            <div className="flex justify-center p-5 rounded">
              <div className="flex flex-col border">
                <div className="flex justify-between border-b relative">
                  <Link to="/" className="flex p-3 font-light">
                    {'<'} BACK TO ALL PRODUCTS
                  </Link>
                  <button
                    onClick={() => onDelete()}
                    className="bg-red-800 rounded self-center px-2 py-1 mr-2 text-stone-50 hover:bg-red-600"
                    type="button"
                  >
                    X
                  </button>
                  {openModal ? (
                    <div className="absolute right-0">
                      <ConfirmationModal onConfirm={onConfirm} onDeny={onDeny} />
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between">
                  <img className="p-5 border-r" src={data.image} alt="product" />
                  <div className="flex flex-col items-start p-5 w-96">
                    <div className="font-semi uppercase text-2xl">{data.name}</div>
                    <div className="uppercase text-sm font-light">{data.category}</div>
                    <div className="font-light mt-3 text-sm">{description}</div>
                    <div className="text-xl mt-4 font-extralight">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        currencyDisplay: 'narrowSymbol',
                      }).format(data.price)}
                    </div>
                    <button className="border mt-4 px-2 py-1 font-light text-sm" type="button">
                      ADD TO CART
                    </button>
                  </div>
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
