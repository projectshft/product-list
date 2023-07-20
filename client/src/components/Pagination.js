// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Pagination() {
//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchProducts(1); // Fetch the first page of products
//     fetchTotalPages();
//   }, []);

//   const fetchProducts = async (page) => {
//     try {
//       const response = await axios.get(`/products?page=${page}`);
//       setProducts(response.data.products);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchTotalPages = async () => {
//     try {
//       const response = await axios.get("/products/count");
//       const count = response.data.count;
//       const totalPages = Math.ceil(count / 9); // Assuming 9 products per page
//       setTotalPages(totalPages);
//     } catch (error) {
//       console.error("Error fetching total pages:", error);
//     }
//   };

//   const handlePageClick = (page) => {
//     fetchProducts(page);
//   };

//   const renderPaginationLinks = () => {
//     const links = [];

//     for (let page = 1; page <= totalPages; page++) {
//       links.push(
//         <button
//           key={page}
//           onClick={() => handlePageClick(page)}
//           disabled={page === currentPage} // Disable the current page button
//         >
//           {page}
//         </button>
//       );
//     }

//     return <div>{links}</div>;
//   };

//   return (
//     <div>
//       {renderPaginationLinks()}
//     </div>
//   );
// }

// export default Pagination;
