import axios from "axios";


export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export async function fetchProducts() {
  const request = await axios.get("http://localhost:8000/products");
  const data = await request.data;
  const products = data.docs;
  console.log(products);
  
  if (request) {
    return {
      type: FETCH_PRODUCTS,
      payload: products,
    };
  } else {
    return {
      type: FETCH_PRODUCTS,
      payload: products,
    };
  }
}


      
      
   

// .then((res) => {
//   let products = res.data.docs;
//   products.map((product) => {
//     product = {
//       category: product.category,
//       name: product.name,
//       price: product.price,
//     };
//     console.log(product);
//     return (
//       <div>
//         <div className="row">
//           <div className="col-sm-3">
//             <div className="card">
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR6phDeYUg6EL4uNj6tdRmksE-PI9qjrbgwA&usqp=CAU"
//                 className="card-img-top"
//                 alt="your product"
//               ></img>
//               <div className="card-body">
//                 <h5 className="card-title">{product.name }</h5>
//                 <p className="card-text">category: {product.category}</p>
//               </div>
//               <div className="card-footer">
//                 <small className="text-muted">
//                   price: ${product.price}
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   });
// })
// .catch((err) => {
//   console.log(err);
// });

export default fetchProducts;
