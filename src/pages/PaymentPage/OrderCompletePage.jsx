import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PaymentPage.style.css";

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order);

  if (orderNum === "") {
    return (
      <Container className="confirmation-page">
        <h1>주문실패</h1>
        <div>
          메인페이지로 돌아가세요.
          <div className="text-align-center">
            <Link to={"/"}>메인페이지로 돌아가기</Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>주문이 완료됐습니다!</h2>
      <div>주문번호:{orderNum}</div>
      <div>
        주문 확인은 내 주문 메뉴에서 확인해주세요
        <div className="text-align-center">
          <Link to={"/my/purchase"}>내 주문 바로가기</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
