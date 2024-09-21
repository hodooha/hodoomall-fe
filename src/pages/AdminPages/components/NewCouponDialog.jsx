import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const CATEGORY = ["TOP", "OUTER", "ALL-IN-ONE", "ACC", "SET", "HOME"];
const STATUS = ["active", "disactive"];
const SIZE = ["XS", "S", "M", "L", "XL", "Free"];

const InitialFormData = {
  name: "",
  description: "",
  dcRate: "",
  minCost: "",
  expiryDate: "",
  totalQty: ""
};
const NewCouponDialog = ({ mode, showDialog, setShowDialog }) => {
  const { selectedCoupon, error } = useSelector((state) => state.coupon);

  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedCoupon
  );
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => {
    setFormData({ ...formData });
    setShowDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (mode === "new") {      
      // dispatch(
      //   createCoupon({ ...formData })
      // );
      setShowDialog(false);
    } else {
      // dispatch(
      //   editCoupon(
      //     { ...formData }
      //   )
      // );
      setShowDialog(false);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        setFormData(selectedCoupon);
      } else {
        setFormData({ ...InitialFormData });
      }
    }
  }, [showDialog]);

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>Create New Coupon</Modal.Title>
        ) : (
          <Modal.Title>Edit Coupon</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="이름"
              required
              value={formData.name}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="dcRate">
            <Form.Label>DC Rate (%)</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="number"
              placeholder="할인율"
              required
              value={formData.dcRate}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            placeholder="설명"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="minCost">
            <Form.Label>Minimum Order Cost</Form.Label>
            <Form.Control
              value={formData.minCost}
              required
              onChange={handleChange}
              type="number"
              placeholder="최소 주문 금액"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="totalQty">
            <Form.Label>Total Quantity</Form.Label>
            <Form.Control
              value={formData.totalQty}
              required
              onChange={handleChange}
              type="number"
              placeholder="쿠폰 발행 개수"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              value={formData.expiryDate}
              required
              onChange={handleChange}
              type="date"            
            />
          </Form.Group>
        </Row>
        {mode === "new" ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default NewCouponDialog;
