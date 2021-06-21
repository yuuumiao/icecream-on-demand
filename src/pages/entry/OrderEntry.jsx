import React from "react";
import Option from "./Options";

function OrderEntry() {
  return (
    <div>
      <Option optionType="scoops" />
      <Option optionType="toppings" />
    </div>
  );
}

export default OrderEntry;
