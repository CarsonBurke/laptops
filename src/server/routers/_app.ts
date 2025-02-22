import { z } from "zod";
import { procedure, router } from "../trpc";
import e from "../../../dbschema/edgeql-js";
import { edgeClient } from "../../scripts/db";
import { LaptopsOrder } from "@/types/laptop";
import { randomBytes, randomUUID, scrypt } from "crypto";
import { fs } from "edgedb/dist/adapter.node";
import { uuid } from "../../../dbschema/edgeql-js/modules/std";
import { Article } from "../../../dbschema/edgeql-js/modules/default";

async function checkLogin(
  username: string,
  password: string
): Promise<boolean> {
  const account = await e
    .select(e.Account, (account) => ({
      password: true,
      username: true,
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

      resolve(key == derivedKey.toString("hex"));
    });
  });
}

function orderLaptopBy(
  laptop: any,
  input: {
    order: LaptopsOrder;
    studentScoreWeight?: number;
    gamingScoreWeight?: number;
    programmingScoreWeight?: number;
    officeWorkScoreWeight?: number;
    videoEditingScoreWeight?: number;
  }
) /* : [number, typeof e.DESC | typeof e.ASC] */ {
  let expression;
  let direction: typeof e.DESC | typeof e.ASC;

  switch (input.order) {
    // Basic
    case LaptopsOrder.BestDeal:
      expression = laptop.saleOf;
      direction = e.DESC;
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
    case LaptopsOrder.WeightedScore:
      expression = e.op(
        e.op(
          e.op(
            e.op(laptop.studentScore, "*", input.studentScoreWeight || 1),
            "+",
            e.op(laptop.gamingScore, "*", input.gamingScoreWeight || 1)
          ),
          "+",
          e.op(
            e.op(
              laptop.programmingScore,
              "*",
              input.programmingScoreWeight || 1
            ),
            "+",
            e.op(laptop.officeWorkScore, "*", input.officeWorkScoreWeight || 1)
          )
        ),
        "+",
        e.op(laptop.videoEditingScore, "*", input.videoEditingScoreWeight || 1)
      );
      /* e.op(e.op(laptop.studentScore, "*", (input.studentScoreWeight || 0)), "+",
        e.op(laptop.gamingScore, "*", (input.gamingScoreWeight || 0))), "+",
        e.op(e.op(laptop.programmingScore, "*", (input.programmingScoreWeight || 0)), "+",
        e.op(e.op(laptop.officeWorkScore, "*", (input.officeWorkScoreWeight || 0)), "+",
        e.op(e.op(laptop.videoEditingScore, "*", (input.videoEditingScoreWeight || 0)))))) */
      /* laptop.gamingScore * (input.gamingScoreWeight || 0) +
        laptop.programmingScore * (input.programmingScoreWeight || 0) +
        laptop.officeWorkScore * (input.officeWorkScoreWeight || 0) +
        laptop.videoEditingScore * (input.videoEditingScoreWeight || 0); */

      direction = e.DESC;
      break;
  }

  return {
    expression,
    direction,
  };
}

export const appRouter = router({
  getLaptopById: procedure
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
          storageName: true,
          cores: true,
          topFrequency: true,
          titleImageId: true,
          displayName: true,
          size: true,
          resolution: true,
          forStudents: true,
          forGaming: true,
          forProgrammers: true,
          forOfficeWork: true,
          forVideoEditing: true,
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
          touchscreen: true,
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
        studentScoreWeight: z.number().optional().or(z.literal(100)),
        gamingScoreWeight: z.number().optional().or(z.literal(100)),
        programmingScoreWeight: z.number().optional().or(z.literal(100)),
        officeWorkScoreWeight: z.number().optional().or(z.literal(100)),
        videoEditingScoreWeight: z.number().optional().or(z.literal(100)),
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
          titleImageId: true,
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
          order_by: orderLaptopBy(laptop, input),
        }))
        .run(edgeClient);
      return laptops;
    }),
  getLaptopsWithoutId: procedure
    .input(
      z.object({
        blacklistId: z.string(),
        order: z.nativeEnum(LaptopsOrder),
        limit: z.number(),
        macos: z.boolean(),
        windows: z.boolean(),
        linux: z.boolean(),
        forStudents: z.boolean(),
        forGaming: z.boolean(),
        forOfficeWork: z.boolean(),
        forProgrammers: z.boolean(),
        forVideoEditing: z.boolean(),
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
          titleImageId: true,
          size: true,
          resolution: true,
          limit: input.limit,
          filter: e.all(
            e.set(
              e.op(laptop.id, "!=", e.uuid(input.blacklistId)),
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
          order_by: orderLaptopBy(laptop, input),
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
          summary: true,
          content: true,
          filter_single: { id: input.id },
        }))
        .run(edgeClient);
      return article;
    }),
  getArticlesWithoutId: procedure
    .input(
      z.object({
        blacklistId: z.string(),
        offset: z.number(),
        limit: z.number(),
      })
    )
    .query(async ({ input }) => {
      const laptops = await e
        .select(e.Article, (article) => ({
          id: true,
          title: true,
          titleImageId: true,
          authorId: true,
          published: true,
          offset: input.offset,
          limit: input.limit,
          filter: e.op(article.id, "!=", e.uuid(input.blacklistId)),
        }))
        .run(edgeClient);
      return laptops;
    }),
  getAuthorArticles: procedure
    .input(
      z.object({
        authorId: z.string(),
        offset: z.number(),
        limit: z.number(),
      })
    )
    .query(async ({ input }) => {
      const laptops = await e
        .select(e.Article, (article) => ({
          id: true,
          title: true,
          titleImageId: true,
          authorId: true,
          published: true,
          offset: input.offset,
          limit: input.limit,
          order_by: {
            expression: article.published,
            direction: e.DESC,
          },
          filter: e.op(article.authorId, "=", e.uuid(input.authorId)),
        }))
        .run(edgeClient);
      return laptops;
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
          filter_single: { id: e.uuid(input.id) },
        }))
        .run(edgeClient);
      return author;
    }),
  insertArticle: procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        title: z.string(),
        summary: z.string(),
        content: z.string(),
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

      const contentImageIds = [];
      for (const file of input.contentImages) {
        const id = randomUUID();
        const path = `${process.cwd()}/public/articleImages/${id}.webp`;

        const base64Buffer = Buffer.from(file, "base64");
        await fs.writeFile(path, base64Buffer);

        contentImageIds.push(id);
      }

      const article = await e
        .insert(e.Article, {
          title: input.title,
          summary: input.summary,
          content: input.content,
          authorId: e.uuid(input.authorId),
          published: new Date(),
          titleImageId: titleImageId,
          contentImageIds: contentImageIds,
        })
        .run(edgeClient);

      return article;
    }),
  insertLaptop: procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        name: z.string(),
        titleImage: z.any(),
        price: z.number(),
        saleOf: z.number(),
        macos: z.boolean(),
        windows: z.boolean(),
        linux: z.boolean(),
        size: z.number(),
        resolution: z.number(),
        ram: z.number(),
        storage: z.number(),
        cores: z.number(),
        topFrequency: z.number(),
        forStudents: z.boolean(),
        forGaming: z.boolean(),
        forProgrammers: z.boolean(),
        forOfficeWork: z.boolean(),
        forVideoEditing: z.boolean(),
        cpuName: z.string(),
        gpuName: z.string(),
        affiliate: z.string(),
        vram: z.number(),
        hasDedicatedGpu: z.boolean(),
        storageName: z.string(),
        displayName: z.string(),
        priceHistory: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await checkLogin(input.username, input.password))) {
        return undefined;
      }

      // Title image

      const titleImageId = randomUUID();
      const path = `${process.cwd()}/public/laptopImages/${titleImageId}.webp`;
      const base64Buffer = Buffer.from(input.titleImage, "base64");
      await fs.writeFile(path, base64Buffer);

      // Scores

      function normalize(value: number, max: number) {
        return Math.min(value, max) / max;
      }

      function normalizedPortion(value: number, max: number, portion: number) {
        return normalize(value, max) * portion;
      }

      // 10 + 10 + 40 + 40
      const studentScore =
        (normalizedPortion(input.cores, 12, 0.1) +
          normalizedPortion(input.topFrequency, 6, 0.1) +
          normalizedPortion(input.ram, 16, 0.4) +
          normalizedPortion(input.storage, 1024, 0.4)) *
        100;
      // 10 + 25 + 15 + 15 + 25 + 10
      const gamingScore =
        (normalizedPortion(input.cores, 20, 0.1) +
          normalizedPortion(input.topFrequency, 6, 0.25) +
          normalizedPortion(input.ram, 32, 0.15) +
          normalizedPortion(input.vram, 16, 0.15) +
          (input.hasDedicatedGpu ? 0.25 : 0) +
          normalizedPortion(input.storage, 2048, 0.1)) *
        100;
      // 30 + 15 + 20 + 15 + 20
      const programmingScore =
        (normalizedPortion(input.cores, 40, 0.3) +
          normalizedPortion(input.topFrequency, 6, 0.15) +
          normalizedPortion(input.storage, 2048, 0.2) +
          normalizedPortion(input.ram, 32, 0.15) +
          normalizedPortion(input.resolution, 2160, 0.2)) *
        100;
      // 30 + 10 + 35 + 25
      const officeWorkScore =
        (normalizedPortion(input.cores, 10, 0.3) +
          normalizedPortion(input.topFrequency, 6, 0.1) +
          normalizedPortion(input.storage, 1024, 0.35) +
          normalizedPortion(input.ram, 16, 0.25)) *
        100;
      // 20 + 20 + 20 + 20 + 20
      const videoEditingScore =
        (normalizedPortion(input.cores, 30, 0.2) +
          normalizedPortion(input.topFrequency, 6, 0.2) +
          normalizedPortion(input.storage, 4096, 0.2) +
          normalizedPortion(input.ram, 64, 0.2) +
          (input.hasDedicatedGpu ? 0.2 : 0)) *
        100;

      const laptop = await e
        .insert(e.Laptop, {
          name: input.name,
          titleImageId: titleImageId,
          price: input.price,
          saleOf: input.saleOf,
          macos: input.macos,
          windows: input.windows,
          linux: input.linux,
          size: input.size,
          resolution: input.resolution,
          ram: input.ram,
          storage: input.storage,
          cores: input.cores,
          topFrequency: input.topFrequency,
          forStudents: input.forStudents,
          forGaming: input.forGaming,
          forProgrammers: input.forProgrammers,
          forOfficeWork: input.forOfficeWork,
          forVideoEditing: input.forVideoEditing,
          studentScore,
          gamingScore,
          programmingScore,
          officeWorkScore,
          videoEditingScore,
          cpuName: input.cpuName,
          gpuName: input.gpuName,
          affiliate: input.affiliate,
          vram: input.vram,
          hasDedicatedGpu: input.hasDedicatedGpu,
          storageName: input.storageName,
          displayName: input.displayName,
          priceHistory: input.priceHistory,
        })
        .run(edgeClient);

      return laptop;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
