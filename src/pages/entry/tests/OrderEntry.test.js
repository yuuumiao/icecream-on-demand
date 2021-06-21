import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handlers error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3000/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
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
test.skip("not a real test but it illustrates how to skip a test", () => {});
