import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const OrderReceipt = ({ cartList, totalPrice, dcPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        <li>
          {cartList && cartList.map((item) => (
            <div className="display-flex space-between">
              <div>{`${item.productId.name + item.size} X ${item.qty}`}</div>

              <div>{currencyFormat(item.productId.price * item.qty)}</div>
            </div>
          ))}
        </li>
      </ul>
      <div
        className={
          location.pathname.includes("/cart") || totalPrice === dcPrice
            ? "display-flex space-between receipt-title"
            : "display-flex space-between receipt-title line-through"
        }
      >
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>₩ {currencyFormat(totalPrice)}</strong>
        </div>
      </div>
      {location.pathname.includes("/payment") && (
        <div
          className={
            totalPrice === dcPrice
              ? "disabled"
              : "display-flex space-between receipt-title color-red"
          }
        >
          <div>
            <strong>Discounted price:</strong>
          </div>
          <div>
            <strong>₩ {currencyFormat(dcPrice)}</strong>
          </div>
        </div>
      )}

      {location.pathname.includes("/cart") && cartList.length > 0 && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          결제 계속하기
        </Button>
      )}

      <div>
        최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.
        <div>
          소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
