import OrderConfirmation from "../OrderConfirmation";
import { render, screen } from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test.skip("Loading shows while contracting the server", async () => {
  render(<OrderConfirmation />);
  const loading = screen.getByText("Loading", { exact: false });
  expect(loading).toBeInTheDocument();

  const thanksHeading = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thanksHeading).toBeInTheDocument;
  expect(loading).not.toBeInTheDocument();
});

//waitForElementToBeRemoved like the popover will work perfectly, but overkill
//(popover is waiting for nothing to show up after)
//or we can add this part to the happy path test, better practice there

test("error response from server for submitting order", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("An un expect error occurred");
});
