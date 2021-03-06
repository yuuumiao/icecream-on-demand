/* eslint-disable react/prop-types */
import Alert from "react-bootstrap/Alert";
import React from "react";

function AletrBanner({ message, variant }) {
  const alertMessage = message || "An un expect error occurred";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}

export default AletrBanner;
