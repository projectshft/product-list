import { ErrorMessage, Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ReviewContainer from './ReviewContainer';
import { useAddReviewByProductIdMutation, useGetReviewByProductIdQuery } from '../services/products';

const ProductReviews = ({ productId }) => {
  const [trigger, result] = useAddReviewByProductIdMutation();
  const { data, isLoading, isError } = useGetReviewByProductIdQuery(productId);

  return (
    <div className="flex flex-col w-3/4 p-5">
      <div className="self-center font-bold text-xl mb-5">Reviews</div>
      <div>
        <ReviewContainer data={data} isLoading={isLoading} isError={isError} />
      </div>
      <div className="">
        <div className="self-center text-center text-lg font-bold mb-5">Leave A Review</div>
        <div className="place-self-end bg-stone-700 px-12 py-4">
          <Formik
            initialValues={{
              userName: '',
              text: '',
              rating: 5,
            }}
            validationSchema={Yup.object({
              userName: Yup.string().max(20, 'Must be 20 Characters or Less').required('Required'),
              text: Yup.string().max(400, 'Must be 400 Characters or Less').required('Required'),
              rating: Yup.number()
                .min(0, 'Please Rate between 0 - 5')
                .max(5, 'Please Rate between 0 - 5')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              trigger({ ...values, product: productId });
            }}
          >
            <Form className="flex flex-col">
              <div className="flex w justify-start ">
                <div className="flex flex-col relative mr-5 py-2 rounded">
                  <label className="text-stone-50" htmlFor="userName">
                    User Name:{' '}
                  </label>
                  <Field className="w-fit pl-2 bg-stone-200" name="userName" type="text" />
                  <ErrorMessage name="userName">
                    {(msg) => <div className="absolute right-0 text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="flex flex-col relative justify-between py-2 rounded">
                  <label className="text-stone-50" htmlFor="rating">
                    Rating
                  </label>
                  <Field name="rating" type="number" min="0" max="5" className="w-fit pl-2 bg-stone-200" />
                  <ErrorMessage name="rating">
                    {(msg) => <div className="absolute right-0 text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>

              <div className="flex flex-col relative py-2 rounded">
                <label className="text-stone-50" htmlFor="text">
                  Review:{' '}
                </label>
                <Field className="pl-2 bg-stone-200" name="text" as="textarea" />
                <ErrorMessage name="text">
                  {(msg) => <div className="absolute right-0 text-red-500">{msg}</div>}
                </ErrorMessage>
              </div>

              <button className="w-1/3 bg-stone-400 text-stone-50 self-center m-2 p-2 rounded-xl" type="submit">
                Add Review
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

ProductReviews.propTypes = {
  productId: PropTypes.string,
};

export default ProductReviews;
