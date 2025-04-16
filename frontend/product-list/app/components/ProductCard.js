"use client";
import Image from "next/image";

const ProductCard = ({ category, name, price, image }) => {
  return (
    <div className="border p-5 m-2">
      <div className="d-flex justify-content-between">
        <div>Category: {category}</div>
        <div>{price}</div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <Image
          src={image}
          alt="Product Placeholder Image"
          width={200}
          height={300}
          unoptimized
          onError={(e) => (e.target.src = "https://prd.place/400")}
        />
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
