import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderStatusCard from "./components/OrderStatusCard";
import { ColorRing } from "react-loader-spinner";
import "./MyPage.style.css";
import { getOrder } from "../../features/order/orderSlice";
import ReactPaginate from "react-paginate";
import CouponTable from "./components/CouponTable";
import { getUserCouponList } from "../../features/coupon/couponSlice";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    orderNum: query.get("orderNum") || "",
    status: query.get("status") || "",
  });
  const { loading, orderList, totalPageNum } = useSelector(
    (state) => state.order
  );
  const { user } = useSelector((state) => state.user);
  const { userCouponList } = useSelector((state) => state.coupon);

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
    // dispatch(getProductList({ ...searchQuery }));
  };

  useEffect(() => {
    dispatch(getOrder({ ...searchQuery, pageSize: 5 }));
    dispatch(getUserCouponList());
  }, [query]);

  useEffect(() => {
    if (searchQuery.orderNum === "") {
      delete searchQuery.orderNum;
    }
    if (searchQuery.status === "") {
      delete searchQuery.status;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate("?" + query);
  }, [searchQuery]);

  if (!user) {
    navigate("/login");
    return;
  }

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
        <Col lg={6} className="mypage-col">
          <div className="mypage-title">주문 내역</div>
          {orderList.length === 0 ? (
            <div className="text-align-center empty-bag">
              주문한 내역이 없습니다.
            </div>
          ) : (
            orderList.map((o) => <OrderStatusCard order={o} />)
          )}
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPageNum}
            forcePage={searchQuery.page - 1}
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
        </Col>

        <Col lg={6} className="mypage-col">
          <div className="mypage-title">쿠폰 내역</div>
          {userCouponList.length === 0 ? (
            <div className="text-align-center empty-bag">
              보유하신 쿠폰이 없습니다.
            </div>
          ) : (
            userCouponList.map((c) => <CouponTable coupon={c} />)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyPage;
