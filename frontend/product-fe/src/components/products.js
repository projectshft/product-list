import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../actions";

export default function Products() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderProduct = () => {
    if (products.length > 0) {
      return products.map((product, index) => (
        <a href="#" key={index} className="group block overflow-hidden">
          <div className="relative h-[350px] sm:h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
            />

            <img
              src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            />
          </div>

          <div className="relative bg-white pt-3">
            <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {product.name}
            </h3>

            <div className="mt-1.5 flex items-center justify-between text-gray-900">
              <p className="tracking-wide">${product.price}</p>

              <p className="text-xs uppercase tracking-wide">{product.category}</p>
            </div>
          </div>
        </a>
      ));
    }
  };

  return (
    <div>
      <div className="container px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3">
          {renderProduct()}
        </div>
      </div>
    </div>
  );
}
