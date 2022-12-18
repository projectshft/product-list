import PropTypes from 'prop-types';
import Pagination from './Pagination';

const ReviewContainer = ({ data, isLoading, isError }) => {
  let review;

  if (data?.reviews.length > 0) {
    console.log(data);
    review = data.reviews.map((review) => (
      <div className="flex flex-col p-1 bg-slate-100 my-1 rounded" key={review._id}>
        <div className=" px-2 font-semibold">{review.userName}</div>
        <div className=" px-2 ">{review.text}</div>
      </div>
    ));
  } else if (data?.reviews.length === 0) {
    review = <div>No Reviews. Be the First to Add!</div>;
  }
  if (isLoading) {
    review = <div>Loading...</div>;
  }
  if (isError) {
    review = <div>error</div>;
  }

  return <div className="flex flex-col my-4">{review}</div>;
};

ReviewContainer.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default ReviewContainer;
