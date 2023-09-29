import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/product";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"; // Import Box component for flex layout

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div style={{ marginTop: "170px" }}>
      <Box display="inline-flex" flexWrap="wrap" gap="30px">
        {products.map((product) => (
          <Card
            key={product.product_id}
            sx={{ maxWidth: 345, marginBottom: 20 }}
          >
            <CardMedia
              component="img"
              height="140"
              image={
                "https://images.unsplash.com/photo-1565462905097-5e701c31dcfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              }
              alt={product.product_name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.product_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {product.description}
                <br />
                Category: {product.category}
                <br />
                Gender: {product.gender}
                <br />
                Price: {product.price}
                <br />
                Supplier: {product.supplier}
                <br />
                Likes: {product.likes}
                <br />
                Color: {product.color}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default ProductList;
