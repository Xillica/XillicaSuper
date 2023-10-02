import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../actions/product";
import { Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

const ExploreProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.singleProduct);
  const baseProduct = product[0];

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Check if product is not an array (initial state or loading)
  if (!Array.isArray(product)) {
    return <div>Loading...</div>;
  }

  // Check if product is an empty array (no data)
  if (product.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="product-list-container">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
          <Card
            sx={{ marginBottom: 2 }}
            elevation={0}
            className="explore--card"
          >
            <Link
              to={`/explore/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                style={{ objectFit: "cover", height: "350px" }}
                image={baseProduct.color_selectedFile}
                alt={baseProduct.product_name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  style={{
                    color: "black",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                  className="explore--card--name"
                >
                  {baseProduct.product_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                  className="explore--card--details"
                >
                  {baseProduct.category} • {baseProduct.gender}
                  <br />
                  <Typography
                    variant="h7"
                    margin={0}
                    style={{ fontWeight: "600" }}
                    className="explore--card--price"
                  >
                    LKR {baseProduct.price}.00
                  </Typography>
                  <br />
                  {product.map((product) => (
                    <Typography item key={product.id}>
                      {product.color} - {product.size_name} - {product.quantity}
                    </Typography>
                  ))}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExploreProduct;
