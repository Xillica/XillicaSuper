import React, { useEffect, usseState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../actions/product";

import CircleIcon from "@mui/icons-material/Circle";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Grid, Container } from "@mui/material";

const ExploreProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.singleProduct);
  const productColors = useSelector((state) => state.singleProduct.colors);
  const productSizes = useSelector((state) => state.singleProduct.sizes);
  const baseProduct = product.product;
  // console.log(baseProduct);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Check if product is an empty array (no data)
  if (!product.product) {
    return <div>No data available.</div>;
  }

  const imageData = productColors;
  return (
    <div style={{ marginTop: "200px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} container alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            <Box sx={{ width: 500, height: 500, overflowY: "scroll" }}>
              <ImageList variant="masonry" cols={3} gap={8}>
                {imageData.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      srcSet={`${item.selectedfile}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.selectedfile}?w=248&fit=crop&auto=format`}
                      alt={item.color}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          alignItems="left"
          justifyContent="left"
          style={{ marginTop: "50px", textAlign: "left" }}
        >
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            style={{
              color: "black",
              fontWeight: "500",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              fontSize: "50px",
            }}
            className="explore--card--name"
          >
            {baseProduct.product_name}
          </Typography>
          <Typography
            gutterBottom
            variant="body"
            component="div"
            style={{
              color: "black",
              // fontWeight: "300",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
            className="explore--card--name"
          >
            {baseProduct.description}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            style={{
              color: "grey",
              // fontWeight: "300",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              // fontSize: "30px",
            }}
            className="explore--card--name"
          >
            {baseProduct.category} • {baseProduct.gender}
          </Typography>
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            style={{
              color: "black",
              // fontWeight: "300",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              fontSize: "30px",
            }}
            className="explore--card--name"
          >
            LKR {baseProduct.price}
          </Typography>
          <Container
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-start",
            }}
          >
            {productColors.map((productColor) => (
              <CircleIcon
                item
                key={productColor.id}
                style={{ color: productColor.color_code, width: "30px" }}
              />
            ))}
          </Container>
        </Grid>
        <Grid item xs={2}></Grid>
        {/* <Link to={`/explore/${product.id}`} style={{ textDecoration: "none" }}>
          <CardContent>
            
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
              {productColors.map((productColors) => (
                <Typography item key={productColors.id}>
                  {productColors.color}
                </Typography>
              ))}
              {productSizes.map((productSizes) => (
                <Typography item key={productSizes.id}>
                  {productSizes.size_name}
                </Typography>
              ))}
            </Typography>
          </CardContent>
        </Link> */}
      </Grid>
    </div>
  );
};

export default ExploreProduct;
