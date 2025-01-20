import { z } from "zod";
import { procedure, router } from "../trpc";
import e from "../../../dbschema/edgeql-js";
import { edgeClient } from "../../scripts/db";
import { LaptopsOrder } from "@/types/db";

function orderLaptopBy(laptop: any, order: LaptopsOrder)/* : [number, typeof e.DESC | typeof e.ASC] */ {

  let expression;
  let direction: typeof e.DESC | typeof e.ASC;

  switch (order) {
    // Basic
    case LaptopsOrder.BestDeal:
      expression = laptop.saleOf;
      direction = e.DESC;
      break;
    case LaptopsOrder.PriceLowToHigh:
      expression = laptop.price;
      direction = e.ASC;
      break;
    case LaptopsOrder.PriceHighToLow:
      expression = laptop.price;
      direction = e.DESC;
      break;
    // Advanced
    case LaptopsOrder.ByMemory:
      expression = laptop.ram;
      direction = e.DESC;
      break;
    case LaptopsOrder.ByStorage:
      expression = laptop.storage;
      direction = e.DESC;
      break;
    case LaptopsOrder.ByCores:
      expression = laptop.cores;
      direction = e.DESC;
      break;
    case LaptopsOrder.ByCpuFrequency:
      expression = laptop.topFrequency;
      direction = e.DESC;
      break;
  }

  return {
    expression,
    direction
  }
}

export const appRouter = router({
  getLaptopByName: procedure
    .input(
      z.object({
        name: z.string(),
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
          ram: true,
          storage: true,
          cores: true,
          topFrequency: true,
          titleImage: true,
          size: true,
          resolution: true,
          filter: e.op(laptop.name, "=", input.name),
        }))
        .run(edgeClient);
      return laptops;
    }),
  getLaptops: procedure
    .input(
      z.object({
        order: z.nativeEnum(LaptopsOrder),
        minPrice: z.number(),
        maxPrice: z.number(),
        macos: z.boolean(),
        windows: z.boolean(),
        linux: z.boolean(),
        minSize: z.number(),
        maxSize: z.number(),
        minResolution: z.number(),
        maxResolution: z.number(),
        minMemory: z.number(),
        maxMemory: z.number(),
        minStorage: z.number(),
        maxStorage: z.number(),
        minCores: z.number(),
        maxCores: z.number(),
        minCpuFrequency: z.number(),
        maxCpuFrequency: z.number(),
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
          ram: true,
          storage: true,
          cores: true,
          topFrequency: true,
          titleImage: true,
          size: true,
          resolution: true,
          filter: e.all(
            e.set(
              e.op(laptop.price, ">=", input.minPrice),
              // I'm confused why it works this way but not the other way
              e.op(laptop.price, "<=", input.maxPrice),
              e.op(laptop.size, ">=", input.minSize),
              e.op(laptop.size, "<=", input.maxSize),
              e.op(laptop.resolution, ">=", input.minResolution),
              e.op(laptop.resolution, "<=", input.maxResolution),
              e.op(laptop.ram, ">=", input.minMemory),
              e.op(laptop.ram, "<=", input.maxMemory),
              e.op(laptop.storage, ">=", input.minStorage),
              e.op(laptop.storage, "<=", input.maxStorage),
              e.op(laptop.cores, ">=", input.minCores),
              e.op(laptop.cores, "<=", input.maxCores),
              e.op(laptop.topFrequency, ">=", input.minCpuFrequency),
              e.op(laptop.topFrequency, "<=", input.maxCpuFrequency),
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
          order_by: orderLaptopBy(laptop, input.order),
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
