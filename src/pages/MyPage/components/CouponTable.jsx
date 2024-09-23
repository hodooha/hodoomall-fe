import React from "react";
import Table from "react-bootstrap/Table";

const CouponTable = ({ coupon }) => {
  let { createdAt, expiredAt } = coupon;
  const diff = new Date(expiredAt) - new Date(createdAt);
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return (
    <div>
      <Table striped bordered hover>
        <thead className="text-center">
          <tr >
            <th>쿠폰명</th>
            <th>사용기한</th>
            <th>D-day</th>
          </tr>
        </thead>
        <tbody className="text-center coupon-table">
          <tr>
            <td>{coupon.coupon.name}</td>
            <td>{`${createdAt.slice(0, 10)} ~ ${expiredAt.slice(0, 10)}`}</td>
            <td>{diffDay}일</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CouponTable;
