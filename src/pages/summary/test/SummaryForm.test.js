import SummaryForm from "../SummaryForm";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//user event is more closer to the user interface in comparasion with the fireEvent
//applying regex expression can avoid the case sensitive issues
test("checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("checking checbox enables the button", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();
});

test("Unchecking the checkbox again disappears the button", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();
  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test("poppver responds to hover", async () => {
  render(<SummaryForm />);
  const nullPoppver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPoppver).not.toBeInTheDocument(); //or .toBeNull()
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    //it happens after the tests
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
