import React from 'react'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../../../utils/number";

const AdminCouponTable = ({ header, data, openEditForm, deleteCoupon }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                {/* <th>{item.id}</th> */}
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{item.description}</th>
                <th>
                  <img src={item.image || "/image/coupons.png"} width={100} alt="image" />
                </th>
                <th>{item.type == "dcRate" ? "할인율" : "할인금액"}</th>
                <th>{item.dcAmount}{item.type == "dcRate" ? "(%)" : "원"}</th>              
                <th>{currencyFormat(item.minCost)}</th>
                <th>{item.duration}</th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>                  
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteCoupon(item.id)}
                    className="mr-1"
                  >-</Button>
                  <Button size="sm" onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <td colSpan={header.length} className='text-align-center'>
             No Data to show
            </td>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminCouponTable