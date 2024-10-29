import React from "react";
import { Modal, Table, Form, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { currencyFormat } from "../../../utils/number";

const OrderStatusDetail = ({ open, handleClose, handleCancelOrder }) => {
  const { selectedOrder } = useSelector((state) => state.order);
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>주문번호: {selectedOrder.orderNum}</p>
        <p>주문날짜: {selectedOrder.createdAt.slice(0, 10)}</p>
        <p>
          주소: {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
        </p>
        <p>
          연락처:{" "}
          {`${
            selectedOrder.contact.lastName + selectedOrder.contact.firstName
          } ${selectedOrder.contact.contact}`}
        </p>
        <p>주문내역</p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.product.name}</td>
                    <td>{currencyFormat(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{currencyFormat(item.price * item.qty)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>총계:</td>
                <td>{currencyFormat(selectedOrder.totalPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Button variant="danger" onClick={() => handleCancelOrder(selectedOrder)}>
          주문취소
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default OrderStatusDetail;
