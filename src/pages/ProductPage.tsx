import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  ListGroup,
  Row,
  Image,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Rating from "../components/Rating";
import Review from "../components/Review.index";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { Store } from "../Store";
import { ApiError } from "../types/ApiError";

import { convertProductToCartItem, getError } from "../utils";
import { generateMockProducts, generateMockReviews } from "../utils/Mock";
import { useGetProductDetailsBySlugQuery, useGetProductReviewsQuery } from "../hooks/productHooks";

import "./ProductPage.styles.css";

const ProductPage = () => {
  const params = useParams();
  const { id } = params;

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const reviews = generateMockReviews(5);
  const [index, setIndex] = useState(0);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(id!);

  // const {
  //   data: reviews,
  //   isLoading: isLoadingReviews,
  //   error: errorReviews,
  // } = useGetProductReviewsQuery(id!);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart");
    navigate("/cart");
  };
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <Container>
      <Row>
        <Col lg={6}>
          <Image className="h-100" src={product.image} alt={product.name} thumbnail fluid />
        </Col>
        <Col
          lg={6}
          className="justify-content-between d-flex flex-column"
          style={{ minHeight: "90%" }}
        >
          <Row>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price : ฿{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
      <Container className="d-flex justify-content-center my-5">
        <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
          {reviews.map((review) => (
            <Carousel.Item key={review.id}>
              <Review data={review} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
};

export default ProductPage;
