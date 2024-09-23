import React from "react";
import {Card, Col, Row, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserCoupon } from "../../../features/coupon/couponSlice";

const CouponCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showCouponDetail = (id) => {
    // navigate(`/coupons/${id}`);
  }

  const handleAddCoupon = () => {
    dispatch(addUserCoupon({couponId: item.id, duration: item.duration}));
  }

  return (
    <Row>
      <Col>
        <Card onClick={()=>showCouponDetail(item.id)}>
          <Card.Img variant="top" src="/image/coupons.png" />
          <Card.Body className="couponCard">
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>   
            <Button onClick={handleAddCoupon} variant="warning">다운로드</Button>         
          </Card.Body>
        </Card>

      </Col>
    </Row>
  );
};

export default CouponCard;
