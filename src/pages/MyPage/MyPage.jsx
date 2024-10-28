import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderStatusCard from "./components/OrderStatusCard";
import { ColorRing } from "react-loader-spinner";
import "./MyPage.style.css";
import { getOrder, orderActions, deleteOrder } from "../../features/order/orderSlice";
import ReactPaginate from "react-paginate";
import CouponTable from "./components/CouponTable";
import { getUserCouponList } from "../../features/coupon/couponSlice";
import OrderStatusDetail from "./components/OrderStatusDetail";
import Swal from "sweetalert2";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    orderNum: query.get("orderNum") || "",
    status: query.get("status") || "",
    sortBy: query.get("sortBy") || "latest",
    productName: query.get("productName") || "",
  });
  const [keyword, setKeyword] = useState({
    keywordType: "orderNum",
    keyword: "",
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

  const handleChange = (event) => {
    console.log(event.target.value);
    const { id, value } = event.target;
    setSearchQuery({ ...searchQuery, [id]: value });
  };

  const handleKeyword = () => {
    setSearchQuery({ ...searchQuery, [keyword.keywordType]: keyword.keyword });
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      handleKeyword();
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openDetail = (order) => {
    setOpen(true);
    dispatch(orderActions.setSelectedOrder(order));
  };

  const cancelOrder = (order) => {
    console.log(order);
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(order.id));
        setOpen(false);
      }
    });
    dispatch(getOrder({ ...searchQuery, pageSize: 5 }));
  };

  useEffect(() => {
    dispatch(getOrder({ ...searchQuery, pageSize: 5 }));
  }, [query]);

  useEffect(() => {
    dispatch(getUserCouponList());
  }, []);

  useEffect(() => {
    if (searchQuery.orderNum === "") {
      delete searchQuery.orderNum;
    }
    if (searchQuery.status === "") {
      delete searchQuery.status;
    }
    if (searchQuery.productName === "") {
      delete searchQuery.productName;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();
    navigate("?" + queryString);
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
          <Row>
            <div className="mypage-title col mb-3">주문 내역</div>
            <Form.Group as={Col} controlId="sortBy">
              <Form.Select
                onChange={handleChange}
                value={searchQuery.sortBy}
                defaultValue="latest"
                size="sm"
              >
                <option value="latest">최신순</option>
                <option value="earliest">오래된순</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="status">
              <Form.Select
                onChange={handleChange}
                defaultValue=""
                value={searchQuery.status}
                size="sm"
              >
                <option value="">= 주문상태 =</option>
                <option value="preparing">배송준비중</option>
                <option value="shipping">배송중</option>
                <option value="delivered">배송완료</option>
                <option value="refund">주문취소</option>
              </Form.Select>
            </Form.Group>
          </Row>
          {orderList.length === 0 ? (
            <div className="text-align-center empty-bag">
              주문 내역이 없습니다.
            </div>
          ) : (
            orderList.map((o) => (
              <OrderStatusCard order={o} openDetail={openDetail} />
            ))
          )}
          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="keywordType"
              value={keyword.keywordType}
            >
              <Form.Select
                defaultValue="productName"
                onChange={(e) =>
                  setKeyword({ ...keyword, keywordType: e.target.value })
                }
              >
                <option value="productName">상품명</option>
                <option value="orderNum">주문번호</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="keyword">
              <Form.Control
                onChange={(e) =>
                  setKeyword({ ...keyword, keyword: e.target.value })
                }
                onClick={() => setKeyword({ ...keyword, keyword: "" })}
                value={keyword.keyword}
                onKeyUp={onCheckEnter}
              />
            </Form.Group>
            <Button as={Col} variant="primary" onClick={handleKeyword}>
              Submit
            </Button>
          </Row>
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
          <div className="mypage-title mb-3">쿠폰 내역</div>
          {userCouponList.length === 0 ? (
            <div className="text-align-center empty-bag">
              보유하신 쿠폰이 없습니다.
            </div>
          ) : (
            <CouponTable couponList={userCouponList} />
          )}
        </Col>
      </Row>
      {open && <OrderStatusDetail open={open} handleClose={handleClose} cancelOrder={cancelOrder}/>}
    </Container>
  );
};

export default MyPage;
