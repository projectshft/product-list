import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
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
        <div className="flex justify-center items-center h-screen">
          <Form className="flex flex-col w-96 p-5 bg-slate-200">
            <label htmlFor="name">Product Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name">{(msg) => <div className="text-red-500">{msg}</div>}</ErrorMessage>

            <label htmlFor="category">Product Category</label>
            <Field name="category" type="text" />
            <ErrorMessage name="category">{(msg) => <div className="text-red-500">{msg}</div>}</ErrorMessage>

            <label htmlFor="price">Product Price</label>
            <Field name="price" type="number" />
            <ErrorMessage name="price">{(msg) => <div className="text-red-500">{msg}</div>}</ErrorMessage>

            <label htmlFor="image">Product Image</label>
            <Field name="image" type="text" />
            <ErrorMessage name="image">{(msg) => <div className="text-red-500">{msg}</div>}</ErrorMessage>

            <button className="w-full bg-green-400 py-1 text-white mt-5" type="submit">
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
