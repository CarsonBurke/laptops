import { z } from "zod";
import { procedure, router } from "../trpc";
import e from "../../../dbschema/edgeql-js";
import { edgeClient } from "../../scripts/db";
import { LaptopsOrder } from "@/types/laptop";
import { randomBytes, randomUUID, scrypt } from "crypto";
import { fs } from "edgedb/dist/adapter.node";
import { uuid } from "../../../dbschema/edgeql-js/modules/std";

async function checkLogin(
  username: string,
  password: string
): Promise<boolean> {
  const account = await e
    .select(e.Account, (account) => ({
      password: true,
      filter_single: e.op(account.username, "=", username),
    }))
    .run(edgeClient);

  if (!account) return false;

  return verify(password, account.password as unknown as string);
}

function verify(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");

    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        console.error("invalid password", err);
        reject(false);
      }

      /* console.log("derivedKey", derivedKey.toString("hex"));
      console.log("key compare", key == derivedKey.toString("hex")); */

      resolve(key == derivedKey.toString("hex"));
    });
  });
}

function orderLaptopBy(
  laptop: any,
  order: LaptopsOrder
) /* : [number, typeof e.DESC | typeof e.ASC] */ {
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
    // Scoring
    case LaptopsOrder.StudentScore:
      expression = laptop.studentScore;
      direction = e.DESC;
    case LaptopsOrder.GamingScore:
      expression = laptop.gamingScore;
      direction = e.DESC;
    case LaptopsOrder.OfficeWorkScore:
      expression = laptop.officeWorkScore;
      direction = e.DESC;
    case LaptopsOrder.ProgrammingScore:
      expression = laptop.programmingScore;
      direction = e.DESC;
    case LaptopsOrder.VideoEditingScore:
      expression = laptop.videoEditingScore;
      direction = e.DESC;
  }

  return {
    expression,
    direction,
  };
}

export const appRouter = router({
  getLaptopByName: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const laptops = await e
        .select(e.Laptop, (laptop) => ({
          id: true,
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
          titleImageName: true,
          size: true,
          resolution: true,
          forStudents: true,
          forGaming: true,
          forProgrammers: true,
          forOfficeWork: true,
          priceHistory: true,
          affiliate: true,
          hasDedicatedGpu: true,
          vram: true,
          cpuName: true,
          gpuName: true,
          studentScore: true,
          gamingScore: true,
          programmingScore: true,
          officeWorkScore: true,
          videoEditingScore: true,
          filter_single: { id: input.id } /* e.op(laptop.id, "=", input.id) */,
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
        forStudents: z.boolean().optional(),
        forGaming: z.boolean().optional(),
        forOfficeWork: z.boolean().optional(),
        forProgrammers: z.boolean().optional(),
        forVideoEditing: z.boolean().optional(),
        minVram: z.number().optional(),
        maxVram: z.number().optional(),
        hasDedicatedGpu: z.boolean().optional(),
        offset: z.number(),
        limit: z.number(),
      })
    )
    .query(async ({ input }) => {
      const laptops = await e
        .select(e.Laptop, (laptop) => ({
          id: true,
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
          titleImageName: true,
          size: true,
          resolution: true,
          forStudents: true,
          forGaming: true,
          forOfficeWork: true,
          forProgrammers: true,
          forVideoEditing: true,
          offset: input.offset,
          limit: input.limit,
          filter: e.all(
            e.set(
              e.op(laptop.price, ">=", input.minPrice),
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
              e.op(laptop.vram, ">=", input.minVram || 0),
              e.op(laptop.vram, "<=", input.maxVram || Number.MAX_SAFE_INTEGER),
              e.op(
                e.op(false, "=", input.hasDedicatedGpu || false),
                "or",
                e.op(laptop.hasDedicatedGpu, "=", input.hasDedicatedGpu == true)
              ),
              e.any(
                e.set(
                  e.op(
                    e.op(laptop.forStudents, "=", true),
                    "and",
                    e.op(laptop.forStudents, "=", input.forStudents == true)
                  ),
                  e.op(
                    e.op(laptop.forGaming, "=", true),
                    "and",
                    e.op(laptop.forGaming, "=", input.forGaming == true)
                  ),
                  e.op(
                    e.op(laptop.forOfficeWork, "=", true),
                    "and",
                    e.op(laptop.forOfficeWork, "=", input.forOfficeWork == true)
                  ),
                  e.op(
                    e.op(laptop.forProgrammers, "=", true),
                    "and",
                    e.op(
                      laptop.forProgrammers,
                      "=",
                      input.forProgrammers == true
                    )
                  ),
                  e.op(
                    e.op(laptop.forVideoEditing, "=", true),
                    "and",
                    e.op(
                      laptop.forVideoEditing,
                      "=",
                      input.forVideoEditing == true
                    )
                  )
                )
              ),
              e.any(
                e.set(
                  e.op(
                    e.op(laptop.linux, "=", true),
                    "and",
                    e.op(laptop.linux, "=", input.linux == true)
                  ),
                  e.op(
                    e.op(laptop.macos, "=", true),
                    "and",
                    e.op(laptop.macos, "=", input.macos == true)
                  ),
                  e.op(
                    e.op(laptop.windows, "=", true),
                    "and",
                    e.op(laptop.windows, "=", input.windows == true)
                  )
                )
              )
            )
          ),
          order_by: orderLaptopBy(laptop, input.order),
        }))
        .run(edgeClient);
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
  getArticleById: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const article = await e
        .select(e.Article, (article) => ({
          id: true,
          title: true,
          titleImageId: true,
          contentImageIds: true,
          authorId: true,
          published: true,
          content: true,
          filter_single: e.op(article.id, "=", e.uuid(input.id)),
        }))
        .run(edgeClient);
      return article;
    }),
  getArticles: procedure
    .input(
      z.object({
        offset: z.number(),
        limit: z.number(),
      })
    )
    .query(async ({ input }) => {
      const laptops = await e
        .select(e.Article, () => ({
          id: true,
          title: true,
          titleImageId: true,
          authorId: true,
          published: true,
          content: true,
          offset: input.offset,
          limit: input.limit,
        }))
        .run(edgeClient);
      return laptops;
    }),
  sendContact: procedure
    .input(
      z.object({
        name: z.string(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const laptops = await e
        .insert(e.Contact, {
          name: input.name,
          title: input.title,
          content: input.content,
        })
        .run(edgeClient);
      return laptops;
    }),
  insertLaptop: procedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
        titleImageName: z.string(),
        titleImage: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await checkLogin(input.username, input.password))) {
        return undefined;
      }

      const laptop = await e
        .insert(e.Laptop, {
          name: input.name,
        })
        .run(edgeClient);

      return laptop;
    }),
  getAuthorById: procedure
    .input(
      z.object({
        id: z.any(),
      })
    )
    .query(async ({ input }) => {
      const author = await e
        .select(e.Author, (author) => ({
          id: true,
          name: true,
          description: true,
          profileImageName: true,
          filter_single: e.op(author.id, "=", e.uuid(input.id)),
        }))
        .run(edgeClient);
      return author;
    }),
  insertArticle: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        username: z.string(),
        password: z.string(),
        authorId: z.string(),
        titleImage: z.any(),
        contentImages: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await checkLogin(input.username, input.password))) {
        return undefined;
      }

      // Title image

      const titleImageId = randomUUID();
      const path = `${process.cwd()}/public/articleImages/${titleImageId}.webp`;
      const base64Buffer = Buffer.from(input.titleImage, "base64");
      await fs.writeFile(path, base64Buffer);

      // Content images

      const contentImageIds = []
      for (const file of input.contentImages) {
        const id = randomUUID()
        const path = `${process.cwd()}/public/articleImages/${id}.webp`;

        const base64Buffer = Buffer.from(file, "base64");
        await fs.writeFile(path, base64Buffer);

        contentImageIds.push(id)
      }

      const article = await e
        .insert(e.Article, {
          title: input.title,
          content: input.content,
          authorId: e.uuid(input.authorId),
          published: new Date(),
          titleImageId: titleImageId,
          contentImageIds: contentImageIds
        })
        .run(edgeClient);

      return article;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
