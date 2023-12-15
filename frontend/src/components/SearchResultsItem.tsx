import { Product } from "../../types/types.ts";

function SearchResultsItem( { product }: { product: Product } ) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-8 m-auto bg-slate-100 pb-4">
      <span className="inline-block text-2xl bg-orange-400 py-2 px-3 mt-4 mx-4 rounded-full">
        ${product.price}
      </span>
      <img
        className="w-3/4 m-auto pt-4"
        src={product.image}
        alt="product-img"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{product.name}</div>
        <p className="text-gray-700 text-lg">
          <b>Category:</b> {product.category}
        </p>
      </div>
    </div>
  );
}

export default SearchResultsItem;
