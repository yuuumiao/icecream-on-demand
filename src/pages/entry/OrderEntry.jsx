import React from "react";
import Option from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderEntry() {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h2>Grand total: {orderDetails.totals.grandTotal} </h2>
      <Option optionType="scoops" />
      <Option optionType="toppings" />
    </div>
  );
}

export default OrderEntry;
