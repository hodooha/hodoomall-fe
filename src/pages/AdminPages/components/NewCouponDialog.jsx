import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../../../features/coupon/couponSlice";
import CloudinaryUploadWidget from "../../../utils/CloudinaryUploadWidget";

const InitialFormData = {
  name: "",
  description: "",
  type:"",
  dcAmount: "",
  minCost: "",
  duration: "",
  totalQty: "",
  status:"active",
  image: ""
};

const STATUS = ["active", "disactive"];

const NewCouponDialog = ({ mode, showDialog, setShowDialog }) => {
  const { selectedCoupon, error } = useSelector((state) => state.coupon);

  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedCoupon
  );

  const dispatch = useDispatch();
  const handleClose = () => {
    setFormData({ ...formData });
    setShowDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (mode === "new") {
      dispatch(createCoupon({ ...formData }));
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

  const uploadImage = (url) => {
    setFormData({ ...formData, image: url });
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

          <Form.Group as={Col} controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select defaultValue={formData.type ? formData.type : ""} onChange={handleChange} required>
              <option value="" disabled>
              == 타입선택 == 
              </option>
              <option value="dcRate">
                할인율(%)
              </option>
              <option value="dcPrice">
                할인금액(원)
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="dcAmount">
            <Form.Label>DC Amount (% or 원)</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="number"
              placeholder="할인율 또는 금액"
              required
              value={formData.dcAmount}
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

        <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label>Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} />

          <img
            id="uploadedimage"
            src={formData.image}
            className="upload-image mt-2"
            alt="uploadedimage"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="minCost">
            <Form.Label>Minimum Cost(원)</Form.Label>
            <Form.Control
              value={formData.minCost}
              required
              onChange={handleChange}
              type="number"
              placeholder="최소 주문 금액"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="totalQty">
            <Form.Label>Total Quantity(개)</Form.Label>
            <Form.Control
              value={formData.totalQty}
              required
              onChange={handleChange}
              type="number"
              placeholder="쿠폰 발행 개수"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="duration">
            <Form.Label>Duration(일)</Form.Label>
            <Form.Control
              value={formData.duration}
              required
              onChange={handleChange}
              type="number"
              placeholder="쿠폰 유효 기간(일)"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
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
