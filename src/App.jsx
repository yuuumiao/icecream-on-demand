import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import SummaryForm from "./pages/summary/SummaryForm";
// eslint-disable-next-line
import Options from "./pages/entry/Options";

function App() {
  return (
    <Container className="App">
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
