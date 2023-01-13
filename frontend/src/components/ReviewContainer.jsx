import { useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmationModal from './ConfirmationModal';
import { useDeleteReviewByIdMutation } from '../services/products';

const ReviewContainer = ({ data, isLoading, isError }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(undefined);
  const [deleteProduct] = useDeleteReviewByIdMutation();

  const onDelete = (idx) => {
    setOpenModal(true);
    setSelectedReview(idx);
  };

  const onConfirm = (reviewId) => {
    setOpenModal(false);
    deleteProduct(reviewId);
  };

  const onDeny = () => {
    setOpenModal(false);
  };

  let reviewElement;

  if (data?.reviews.length > 0) {
    reviewElement = data.reviews.map((review, idx) => (
      <div className="flex flex-col p-1 basis-1/4 rounded h-40 overflow-hidden mb-5" key={review._id}>
        <div className="flex justify-between px-2 font-semibold relative">
          <div>{review.userName}</div>
          <button
            onClick={() => onDelete(idx)}
            className="text-xs bg-red-800 text-white px-2 py-1 rounded font-light hover:bg-red-600"
            type="button"
          >
            X
          </button>
          {openModal && selectedReview === idx ? (
            <div className="absolute right-0">
              <ConfirmationModal onConfirm={() => onConfirm(review._id)} onDeny={onDeny} />
            </div>
          ) : null}
        </div>
        <div className=" px-2 text-sm">{review.text}</div>
        <div className=" px-2 self-end text-sm">{new Date(review.createdAt).toLocaleDateString('en-US')}</div>
      </div>
    ));
  } else if (data?.reviews.length === 0) {
    reviewElement = <div>No Reviews. Be the First to Add!</div>;
  }
  if (isLoading) {
    reviewElement = <div>Loading...</div>;
  }
  if (isError) {
    reviewElement = <div>error</div>;
  }

  return <div className="flex justify-center my-4">{reviewElement}</div>;
};

ReviewContainer.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default ReviewContainer;
