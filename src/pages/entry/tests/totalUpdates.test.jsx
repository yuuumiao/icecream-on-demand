import React from "react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("updating scroops subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  //We are wrapping the provider here is only becasue we didnt wrapp the whole app in the provider
  //Other options to wrap: routers, redex provider

  const scoopsSubtotal = screen.getByText("Scoops total", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //vanilla price is got from api => api
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput); //always clear before input
  userEvent.type(vanillaInput, "1"); //userEvent type requires inserting a string
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
