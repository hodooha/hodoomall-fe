import React from "react";
import { Table, Badge } from "react-bootstrap";
import { currencyFormat } from "../../../utils/number";

const badgeBg = {
  preparing: "primary",
  shipping: "warning",
  refund: "danger",
  delivered: "success",
  canceled: "danger",
};

const OrderTable = ({ header, data, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title) => (
              <th>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr onClick={() => openEditForm(item)}>
                <th>{index}</th>
                <th>{item.orderNum}</th>
                <th>{item.createdAt.slice(0, 10)}</th>
                <th>{item.user.email}</th>
                {item.items.length > 0 ? (
                  <th>
                    {item.items[0].product.name}
                    {item.items.length > 1 && `외 ${item.items.length - 1}개`}
                  </th>
                ) : (
                  <th></th>
                )}

                <th>{item.shipTo.address + " " + item.shipTo.city}</th>

                <th>{currencyFormat(item.totalPrice)}</th>
                <th>
                  <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
                </th>
              </tr>
            ))
          ) : (
            <td colSpan={header.length} className='text-align-center'>No Data to show</td>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default OrderTable;
