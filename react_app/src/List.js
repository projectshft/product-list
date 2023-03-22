import { useEffect, useState } from "react";
import Nav from "./NavBar";
import ProductDetails from "./ProductDetail";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  async function fetchProducts(query, price, category) {
    try {
      const filter = [];

      if (query) filter.push(`?query=${query}`);
      if (category) filter.push(`?category=${category}`);
      if (price) filter.push(`?price=${price}`);
      //**Having a hard time making all of them work in sync */
      const allFilters = filter.length > 0 ? `${filter.join("&")}` : "";
      const response = await fetch(
        `http://localhost:8000/products${allFilters}`
      );

      console.log("Search and Query", allFilters);
      console.log("All Data", response);

      const productsData = await response.json();
      const dataArray = productsData.products;
      console.log("AllData", dataArray);

      setProducts(dataArray);
    } catch (error) {
      console.error("Data Error", error);
    }
  }

  const filterByPrice = (price) => {
    if (price === "highest") {
      fetchProducts(null, "highest", null);
    }
    if (price === "lowest") {
      fetchProducts(null, "lowest", null);
    }
  };

  const filterByCategory = (category) => {
    fetchProducts(null, null, category);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Nav
        onSearch={fetchProducts}
        chooseCategory={filterByCategory}
        handlePrice={filterByPrice}
      />
      <ProductDetails products={products}/>
    </div>
  );
};

export default ProductPage;
