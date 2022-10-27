import axios from "axios";
import React from "react";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export async function Call() {
  const request = await axios.get("http://localhost:8000/products");
  const data = await request.data;
  let products = data.docs;
  console.log(products);
  products.map((product) => {
    product = {
      category: product.category,
      name: product.name,
      price: product.price,
    };
    console.log(product);
    return(
      <div>
        
      </div>
    );
  });
  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
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

export default Call;
