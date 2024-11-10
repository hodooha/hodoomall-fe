import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import { ColorRing } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const { productList, error, loading, totalPageNum } = useSelector(
    (state) => state.product
  );

  const handlePageClick = ({ selected }) => {
    query.set("page", selected + 1);
    setQuery(query);
  };

  useEffect(() => {
    dispatch(
      getProductList({
        page: query.get("page") || 1,
        name: query.get("name") || "",
        category: query.get("category") == null ? "" : query.get("category"),
        pageSize: 8,
      })
    );
  }, [query]);

  if (loading) {
    return (
      <div className="spinner">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <Container>
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {productList.map((i) => (
            <Col key={i.id} md={3} sm={12}>
              <ProductCard item={i} />
            </Col>
          ))}
        </Row>
      )}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={(query.get("page") || 1) - 1}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="display-center list-style-none"
      />
    </Container>
  );
};

export default ProductsPage;
