import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function SummaryForm({ setOrderPhase }) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderPhase("completed");
  };

  const popover = (
    <Popover id="popover-terms-and-conditions">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkBoxLabel = (
    <div>
      I agree to{" "}
      <OverlayTrigger
        style={{ color: "blue" }}
        placement="right"
        overlay={popover}
      >
        <span>Terms and Conditions</span>
        {/* if the "terms..." weren't wrapped in the span tag, it will throw Error: React.Children.only expected to receive a single React element */}
      </OverlayTrigger>
    </div>
  );

  return (
    <div className="SummaryForm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            label={checkBoxLabel}
            checked={checkboxChecked}
            onChange={() => setCheckboxChecked(!checkboxChecked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!checkboxChecked}>
          Confirm your order
        </Button>
      </Form>
    </div>
  );
}

export default SummaryForm;
