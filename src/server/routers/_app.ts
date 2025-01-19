import { z } from "zod";
import { procedure, router } from "../trpc";
import e from "../../dbschema/edgeql-js";
import { edgeClient } from "../../scripts/db";

export const appRouter = router({
  getLaptopsByName: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      const laptops = await e
        .select(e.Laptop, (laptop) => ({
          name: true,
          filter: e.op(laptop.name, "=", input.name),
        }))
        .run(edgeClient);
      return laptops;
    }),
  getLaptops: procedure
    .input(
      z.object({
        minPrice: z.number(),
        maxPrice: z.number(),
        macos: z.boolean(),
        windows: z.boolean(),
        linux: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const laptops = await e
        .select(e.Laptop, (laptop) => ({
          name: true,
          price: true,
          saleOf: true,
          macos: true,
          windows: true,
          linux: true,
          filter: e.all(
            e.set(
              e.op(laptop.price, ">=", input.minPrice),
              // I'm confused why it works this way but not the other way
              e.op(laptop.price, ">=", input.maxPrice),
              /* e.op(useCaseStudents, "=", useCaseStudents),
            e.op(useCaseGaming, "=", useCaseGaming),
            e.op(useCaseProgrammers, "=", useCaseProgrammers),
            e.op(useCaseWork, "=", useCaseWork),
            e.op(dedicatedGPU, "=", dedicatedGPU),*/
              e.any(
                e.set(
                  e.op(laptop.linux, "=", true),
                  e.op(laptop.macos, "=", true),
                  e.op(laptop.windows, "=", true)
                )
              )
            )
          ),
        }))
        .run(edgeClient);
        console.log("max price", input.maxPrice)
      return laptops;
    }),
  getArticlesLoggedIn: procedure.query(async ({ ctx }: { ctx: any }) => {
    if (!(await ctx.session.isSignedIn())) {
      throw new Error("Not signed in");
    }

    const laptops = await e
      .select(e.Laptop, () => ({
        name: true,
      }))
      .run(edgeClient);
    return laptops;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
