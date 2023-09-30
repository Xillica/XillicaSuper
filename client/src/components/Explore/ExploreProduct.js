import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api";

const ExploreProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.id}</h1>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Gender: {product.gender}</p>
      <p>Price: {product.price}</p>
      <p>Supplier: {product.supplier}</p>
      <p>Likes: {product.likes}</p>
      <p>Color: {product.color}</p>
    </div>
  );
};

export default ExploreProduct;
