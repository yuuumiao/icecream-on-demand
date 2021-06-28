// import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test.skip("handlers error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3000/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />); //jest mock functions as props
  //   The following wont work as it will only find the first api call and test, "Unable to find role="alert""
  //   Instead you need to warp everything inside the waitFor, with another async func
  //   const alerts = await screen.findAllByRole("alert", {
  //     name: "An unexpected ocurred.",
  //   });
  await (waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  }),
  { timeout: 4000 });
});
//This waitFor will timeOut, so the third argument is added
// await (waitFor(() => screen.getByText('text rendered by child'),{timeout:3000}));

//using test.only and test.skip to isolate tests - with test and p
// test.skip("not a real test but it illustrates how to skip a test", () => {});
// test.only("not a real test but it illustrates how to only test a single test", () => {});

test("disable order button if no scoops are ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  //button disabled at first
  const orderButton = screen.getByRole("button", { name: /place your order/i });
  expect(orderButton).toBeDisabled();

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  //enable the button when the input is added
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  //disable the button again if the input is reset to 0
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
