import ScoopOptions from "../ScoopOptions";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("indicate if scoop count is non-int or out of range", async () => {
  render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);

  //nagative number is invalid
  const vanillaInput = screen.getByRole("spinbutton");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  //decimal input is invalid
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  //input over 10 is invalid
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  //input that is valid will remove the class
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
