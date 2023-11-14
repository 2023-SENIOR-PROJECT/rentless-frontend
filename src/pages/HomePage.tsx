import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { useGetProductsQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { generateMockProducts } from "../utils/Mock";

export default function HomePage() {
  var { data: products, isLoading, error } = useGetProductsQuery();

  //Commment because Gatewat may be completely finish yet
  // const isLoading = false;
  // const error = false;
  //const products = generateMockProducts(5);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>Rentless Connxt</title>
      </Helmet>
      {products!.map((product) => (
        <Col key={product.id} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
