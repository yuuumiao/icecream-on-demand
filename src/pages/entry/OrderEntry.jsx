import React from "react";
import Option from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";

function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  const buttonDisabled = orderDetails.totals.scoops === "$0.00";
  // size is the way to check the length of a map, but using orderDetails.scoops.size doesnt work when the input resets to 0

  return (
    <div>
      <h2>Grand total: {orderDetails.totals.grandTotal} </h2>
      <Option optionType="scoops" />
      <Option optionType="toppings" />
      <Button disabled={buttonDisabled} onClick={() => setOrderPhase("review")}>
        Place your order
      </Button>
    </div>
  );
}

export default OrderEntry;
