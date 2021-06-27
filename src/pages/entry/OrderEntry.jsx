import React from "react";
import Option from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";

function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h2>Grand total: {orderDetails.totals.grandTotal} </h2>
      <Option optionType="scoops" />
      <Option optionType="toppings" />
      <Button onClick={() => setOrderPhase("review")}>Place your order</Button>
    </div>
  );
}

export default OrderEntry;
