import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";
import Button from "react-bootstrap/Button";
import Loading from "../common/Loading";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    //in a real app it is the info that we will get from the context
    //and send with post
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        // console.log("response", response);
        setOrderNumber(response.data.orderNumber);
      })
      .catch(() => setError(true));
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  if (error) return <AlertBanner />;
  if (orderNumber) {
    return (
      <div className="OrderConfirmation" style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <h2>Your order number is {orderNumber} </h2>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else return <Loading />;
}

export default OrderConfirmation;
