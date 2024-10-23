import React, { useEffect, useState } from "react";
import { getCouponList } from "../../features/coupon/couponSlice";
import { Row, Col, Container, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ColorRing } from "react-loader-spinner";
import CouponCard from "./components/CouponCard";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import "./CouponsPage.style.css";

const CouponsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, couponList, selectedCoupon, totalPageNum } =
    useSelector((state) => state.coupon);
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    dispatch(
      getCouponList({
        name: query.get("name"),
        page: query.get("page") || 1,
      })
    );
  }, [query]);

  const handlePageClick = ({ selected }) => {
    query.set("page", selected + 1);
    setQuery(query);
    // dispatch(getProductList({ ...searchQuery }));
  };

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
      <Row>
        {couponList &&
          couponList.map((i) => (
            <Col key={i.id} md={3} sm={12}>
              <CouponCard item={i} />
            </Col>
          ))}
      </Row>

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

export default CouponsPage;
