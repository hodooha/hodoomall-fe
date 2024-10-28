import React from "react";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../../../utils/number";

const CouponTable = ({ couponList }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>쿠폰명</th>
            <th>최소주문금액</th>
            <th>사용기한</th>
            <th>D-day</th>
          </tr>
        </thead>
        <tbody className="text-center coupon-table">
          {couponList &&
            couponList.map((c) => {
              const { createdAt, expiredAt } = c;
              const diff = new Date(expiredAt) - new Date(createdAt);
              const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
              return (
                <tr>
                  <td>{c.coupon.name}</td>
                  <td>{currencyFormat(c.coupon.minCost)}원</td>
                  <td>{`${createdAt.slice(0, 10)} ~ ${expiredAt.slice(
                    0,
                    10
                  )}`}</td>
                  <td>{diffDay}일</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default CouponTable;
