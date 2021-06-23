import React from "react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

test("updating all the toppings subtotal when the toppings checked", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total", { exact: false });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  expect(cherriesCheckbox).not.toBeChecked();
  expect(hotFudgeCheckbox).not.toBeChecked();

  userEvent.click(cherriesCheckbox); //cherries checked
  expect(cherriesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent(/1.50/);

  userEvent.click(hotFudgeCheckbox); //cherries and hotFudge checked
  expect(hotFudgeCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent(/3.00/);

  userEvent.click(cherriesCheckbox); //hotFudge checked, cherries unchecked
  expect(cherriesCheckbox).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent(/1.50/);
});

describe("grand total", () => {
  // test("grand total starts at 0.00", () => {
  //   render(<OrderEntry />);
  //   const grandTotal = screen.getByRole("heading", {
  //     name: /grand total: \$/i,
  //   });
  //   expect(grandTotal).toHaveTextContent(/0.00/);
  // });

  test("grand total starts from O, and updates if the scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent(/0.00/);
    //moving the first test here is to solve the error "Can't perform a React state update on an unmounted component"
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const mmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    expect(grandTotal).toHaveTextContent(/2.00/);
    userEvent.click(mmsCheckbox);
    expect(grandTotal).toHaveTextContent(/3.50/);
  });

  test("grand total updates if the topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent(/1.50/);
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent(/3.50/);
  });

  test("grand total updates if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    expect(grandTotal).toHaveTextContent(/3.50/);
    userEvent.click(cherriesCheckbox);
    userEvent.type(chocolateInput, "0");
    expect(grandTotal).toHaveTextContent(/0.00/);
  });
});
