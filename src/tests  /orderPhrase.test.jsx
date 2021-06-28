import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phrasese for happy path", async () => {
  //render app
  render(<App />);
  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();

  //find and click order button
  const orderButton = screen.getByRole("button", {
    name: /place your order/i,
  });
  userEvent.click(orderButton);

  //check summary infomatipn based on the order
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();
  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // const summaryInfo = screen.getByText(/your order summary/i);
  // expect(summaryInfo).toHaveText(/5.50/);

  const optionItems = screen.getAllByRole("listitem");
  // expect(optionItems).toHaveLength(3);
  const optionItemsText = optionItems.map((i) => i.textContent);
  expect(optionItemsText).toEqual(["1 Vanilla", "2 Chocolate", "Cherries"]);
  //accept terms and conditions and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditionsCheckbox);

  //confirm order number on confirmation page
  const confirmButton = screen.getByRole("button", {
    name: /confirm your order/i,
  });
  userEvent.click(confirmButton);

  // Expect "loading" page will show up
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  //The confirmation page is loaded
  const thanksHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thanksHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //expect that the loading has disappered
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total", { exact: false });
  const toppingsSubtotal = screen.getByText("Toppings total", { exact: false });
  const grandTotal = screen.getByRole("heading", { name: /grand total/i });

  expect(scoopsSubtotal).toHaveTextContent(/0.00/);
  expect(toppingsSubtotal).toHaveTextContent(/0.00/);
  expect(grandTotal).toHaveTextContent(/0.00/);

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

test("optinally show toppings on the summary page", async () => {
  render(<App />);
  //adding the mint chip and salted caramel scoops without any toopings
  const minchipInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(minchipInput);
  userEvent.type(minchipInput, "3");
  const saltedcaramelInput = screen.getByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(saltedcaramelInput);
  userEvent.type(saltedcaramelInput, "1");

  //click the button to place your order
  const orderButton = screen.getByRole("button", { name: /place your order/i });
  userEvent.click(orderButton);

  //The toppings elements wont display on the summary page
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();
  const scoopsHeading = screen.getByRole("heading", { name: /scoops/i });
  expect(scoopsHeading).toHaveTextContent(/8.00/);
  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i }); //query is for those not in the documents
  expect(toppingsHeading).not.toBeInTheDocument();
});
