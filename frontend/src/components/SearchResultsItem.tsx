function SearchResultsItem() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-8 m-auto">
      <img className="w-2/3 m-auto" src="https://via.placeholder.com/250?text=Product+Image" alt="product-img" />
      <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-center">The Coldest Sunset</div>
        <p className="text-gray-700 text-base text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 m-auto">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div>
    </div>
  );
}

export default SearchResultsItem;
