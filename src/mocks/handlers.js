//handler type is either rest or graphQL
//more info Mock service worker: http://mswjs.io/docs/basics/response-resolver

import { rest } from "msw";

export const handler = [
  rest.get("http://localhost:3030", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
];
