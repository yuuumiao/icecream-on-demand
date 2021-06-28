import React from "react";
import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/orderConfirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let OrderPhaseComponent = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      OrderPhaseComponent = OrderEntry;
      break;
    case "review":
      OrderPhaseComponent = OrderSummary;
      break;
    case "completed":
      OrderPhaseComponent = OrderConfirmation;
      break;
  }

  return (
    <Container className="App">
      <OrderDetailsProvider>
        <Container>
          {<OrderPhaseComponent setOrderPhase={setOrderPhase} />}
        </Container>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
