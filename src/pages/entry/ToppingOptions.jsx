/* eslint-disable react/prop-types */
import React from "react";
import Col from "react-bootstrap/Col";

function ToppingOptions({ imagePath, name }) {
  return (
    <Col
      className="ToppingOptions"
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={{ textAlign: "center" }}
    >
      <img src={`http://localhost/3030/${imagePath}`} alt={`${name} topping`} />
    </Col>
  );
}

export default ToppingOptions;
