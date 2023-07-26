import { z } from "zod";
import { LiteHTTP } from "./lite-http";
import { describe, it } from "node:test";

it("Lite HTTP", async () => {
  const server = new LiteHTTP();
  await server.listen();
  server.api(
    "my_api",
    new URLPattern({ pathname: "/my_api" }),
    z.object({ firstName: z.string(), lastName: z.string() }),
    z.object({ fullName: z.string() }),
    async ({ firstName, lastName }) => {
      return { fullName: `${firstName} ${lastName}` };
    },
  );

  console.log(`Server ready on ${server.toURL()}`);
});
