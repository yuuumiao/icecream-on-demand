import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handlers error for scoops and toppings routes", async () => {
  server.resetHanders(
    rest.get("http://localhost:3000/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
  //   The following wont work as it will only find the first api call and test
  //   Instead you need to warp everything inside the waitFor, with another async func
  //   const alerts = await screen.findAllByRole("alert", {name: "An unexpected ocurred.",});

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

//using test.only and test.skip to isolate tests
test.skip("not a real test but we skip it", () => {});
