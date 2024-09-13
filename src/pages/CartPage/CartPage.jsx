import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import CartProductCard from "./components/CartProductCard";
import OrderReceipt from "./components/OrderReceipt";
import { getCartList } from "../../features/cart/cartSlice";
import "./CartPage.style.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, loading, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCartList());
    console.log(cartList);
    // dispatch(getCouponList());
  }, []);

  if (loading || !cartList) {
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
        <Col xs={12} md={7}>
          {!user || cartList.length === 0 ? (
            <div className="text-align-center empty-bag">
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          ) : (
            cartList.map((item) => (
              <CartProductCard item={item}></CartProductCard>
            ))
          )}
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
