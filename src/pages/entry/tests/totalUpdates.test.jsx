import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("updating scroops subtotal when scoops change", async () => {
  render(<Option optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoop total $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //vanilla price is got from api => api
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput); //always clear before input
  userEvent.type(vanillaInput, "1"); //userEvent type requires inserting a string
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = screen.findByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
