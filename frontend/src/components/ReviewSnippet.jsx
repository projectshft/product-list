const ReviewSnippet = () => {
  const reviewArray = ['*', '*', '*', '*', '*'];

  return (
    <ul className="flex">
      {reviewArray.map((star) => (
        <li className="px-1">{star}</li>
      ))}
    </ul>
  );
};

export default ReviewSnippet;
