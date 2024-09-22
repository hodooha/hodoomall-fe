import React from 'react'
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ColorRing } from "react-loader-spinner";


const CouponPage = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const AddCoupon = (event) => {
      if (!user) {
        navigate("/login");
        return;
      }
    //   dispatch(AddCoupon(event.target.id));
    };
  
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
        <div className="event-poster">
          <h1>오픈 기념 EVENT</h1>
          <img src="/image/coupon.png" alt="coupon-event"></img>
  
          <div>
            <span>&#8251;</span> 회원가입 후 구매 이력이 한번도 없는 회원만 발급
            가능합니다.
          </div>
          <div>
            <span>&#8251;</span> 회원 구입 시에만 쿠폰 적용이 가능합니다.
          </div>
          <div className="red-color">
            <span>&#8251;</span> 쿠폰 발급 후 사용기한은 7일입니다.
          </div>
  
          <Button
            onClick={AddCoupon}
            variant="secondary"
          >
            쿠폰 다운로드
          </Button>
        </div>
      </Container>
    );
  };
export default CouponPage