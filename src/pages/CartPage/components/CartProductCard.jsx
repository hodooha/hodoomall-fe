import React, { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { updateQty, deleteCartItem } from "../../../features/cart/cartSlice";
import { currencyFormat } from "../../../utils/number";

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (value) => {
    dispatch(
      updateQty({ productId: item.productId, size: item.size, qty: value })
    );
  };

  const deleteCart = (item) => {
    dispatch(deleteCartItem({ productId: item.productId, size: item.size }));
  };

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img src={item.product.image} width={112} />
        </Col>
        <Col md={10} xs={12}>
          <div className="display-flex space-between">
            <h3>{item.product.name}</h3>
            <button className="trash-button">
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                onClick={() => deleteCart(item)}
              />
            </button>
          </div>

          <div>
            <strong>₩ {currencyFormat(item.product.price)}</strong>
          </div>
          <div>Size: {item.size}</div>
          <div>Total: ₩ {currencyFormat(item.product.price * item.qty)}</div>
          <div>
            Quantity:
            <Form.Select
              onChange={(event) => handleQtyChange(event.target.value)}
              required
              className="qty-dropdown"
              defaultValue={item.qty}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;
