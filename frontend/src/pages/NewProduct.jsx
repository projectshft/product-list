import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Header from '../components/Header';
import { useAddProductMutation } from '../services/products';

const NewProduct = () => {
  const [trigger, { isSuccess, isError, isLoading }] = useAddProductMutation();
  const [showPopup, setShowPopup] = useState(false);

  let formSubmitStatus;

  if (isSuccess && showPopup) {
    formSubmitStatus = <div className="bg-green-500">Form Submitted</div>;
  }
  if (isError && showPopup) {
    formSubmitStatus = <div className="bg-redd-500">Error Submitting Form. Please Try Again</div>;
  }
  if (isLoading && showPopup) {
    formSubmitStatus = <div className="bg-yellow-500">Form Submitting...</div>;
  }

  if (showPopup) {
    setInterval(() => {
      setShowPopup(false);
    }, 6000);
  }

  return (
    <>
      <Header />
      <Formik
        initialValues={{
          name: '',
          category: '',
          price: 0,
          image: 'https://via.placeholder.com/250?text=Product+Image',
        }}
        validationSchema={Yup.object({
          name: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          category: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          price: Yup.number().moreThan(0, 'Must be more than $0.00').required('Required'),
          image: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          trigger(values);
          setSubmitting(false);
          setShowPopup(true);
          resetForm();
        }}
      >
        <div className="flex justify-center">
          <Form className="flex flex-col px-16 py-10 bg-stone-600">
            <div className="flex justify-between my-6 relative">
              <label className="mr-4 text-stone-50" htmlFor="name">
                Product Name:
              </label>
              <Field className="pl-2" name="name" type="text" />
              <ErrorMessage name="name">
                {(msg) => <div className="text-red-500 absolute right-0 top-6">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="flex justify-between my-6 relative">
              <label className="mr-4 text-stone-50" htmlFor="category">
                Product Category:
              </label>
              <Field className="pl-2" name="category" type="text" />
              <ErrorMessage name="category">
                {(msg) => <div className="text-red-500 absolute right-0 top-6">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="flex justify-between my-6 relative">
              <label className="mr-4 text-stone-50" htmlFor="price">
                Product Price:
              </label>
              <Field className="pl-2" name="price" type="number" />
              <ErrorMessage name="price">
                {(msg) => <div className="text-red-500 absolute right-0 top-6">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="flex justify-between my-6 relative">
              <label className="mr-4 text-stone-50" htmlFor="image">
                Product Image:
              </label>
              <Field className="pl-2" name="image" type="text" />
              <ErrorMessage name="image">
                {(msg) => <div className="text-red-500 absolute right-0 top-6">{msg}</div>}
              </ErrorMessage>
            </div>

            <button className="w-full bg-stone-200 py-1 text-stone-900 mt-5" type="submit">
              Add New Product
            </button>
          </Form>
        </div>
      </Formik>
      <div className="fixed top-0 text-center w-full">{formSubmitStatus}</div>
    </>
  );
};

export default NewProduct;
