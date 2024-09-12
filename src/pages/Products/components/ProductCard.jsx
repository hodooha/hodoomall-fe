import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";
import { useSelector } from "react-redux";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`)
  };

  return (
    <div className="card" onClick={() => showProduct(item.id)}>
      <img src={item.image} alt="" />
      <div className="card-name">{item.name}</div>
      <div>₩ {currencyFormat(item.price)}</div>
    </div>
  );
};

export default ProductCard;
