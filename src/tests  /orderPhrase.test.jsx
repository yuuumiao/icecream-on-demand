import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("order phrasese for happy path", async () => {
  //render app
  render(<App />);
  //add ice cream scoops and toppings
  const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  const chocolateInput = screen.getByRole("spinbutton", {
    name: "chocolate",
  });
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, "2")

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  //find and click order button
  const orderButton = screen.getByRole("button", {
    name: /submit your order/i,
  });
  userEvent.click(orderButton);

  //check summary infomatipn based on the order
  const summaryHeading = screen.getByRole('heading', {name:/order summaru/i})
  expect(summaryHeading).toBeInTheDocument()
  const scoopsHeading = screen.getByRole('heading', {name: "Scoops: $6.00"})
  expect(scoopsHeading).toBeInTheDocument()
  const toppingsHeading = screen.getByRole('heading', {name: "Toppings: $1.50"})
  expect(toppingsHeading).toBeInTheDocument()

  // const summaryInfo = screen.getByText(/your order summary/i);
  // expect(summaryInfo).toHaveText(/5.50/);

  const optionItems = screen.getAllByRole("listitem")
  const optionItemsText = optionItems.map((i) => i.textContent)
  expect(optionItemsText).toEqual(["1 Vanilla", "2 Chocolate", "Cherries"])
  //accept terms and conditions and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditionsCheckbox);

  //confirm order number on confirmation page
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmButton);

  const thanksHeader = await screen.findByRole("heading", {name: /thank you/i })
  expect(thanksHeader).toBeInTheDocument()

  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total", { exact: false });
  const toppingsSubtotal = screen.getByText("Toppings total", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent(/0.00/);
  expect(toppingsSubtotal).toHaveTextContent(/0.00/);
  expect(grandTotal).toHaveTextContent(/0.00/);

  await screen.findByRole("spinbutton", {name: "Vanilla"})
  await screen.findByRole("spinbutton", {name: "Cherries")}
});
