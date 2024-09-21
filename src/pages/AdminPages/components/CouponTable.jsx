import React from 'react'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../../../utils/number";

const CouponTable = ({ header, data, openEditForm, deleteCoupon }) => {
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.id}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{item.description}</th>
                <th>{item.dcRate}(%)</th>              
                <th>{currencyFormat(item.minCost)}</th>
                <th>{item.expiryDate}</th>
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

export default CouponTable