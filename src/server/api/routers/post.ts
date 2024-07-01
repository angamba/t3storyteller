import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(10),
        keywords: z.array(z.number()).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const story = await ctx.db.story.create({
        data: {
          title: input.title,
          content: input.content,
          createdBy: { connect: { id: ctx.user.id } },
        },
      });

      await ctx.db.keywordOnPost.createMany({
        data: input.keywords.map((item) => ({
          storyId: story.id,
          keywordId: item,
        })),
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ keywords: z.array(z.number()).optional() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.story.findMany({
        where:
          input?.keywords && input?.keywords?.length > 0
            ? {
                keywords: {
                  some: {
                    keywordId: {
                      in: input.keywords,
                    },
                  },
                },
              }
            : {},
        include: { createdBy: true, keywords: { include: { keyword: true } } },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  approve: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.story.update({
        where: { id: input },
        data: {
          status: "APPROVED",
        },
      });
    }),

  myStories: protectedProcedure
    .input(z.object({ keywords: z.array(z.number()).optional() }))
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const where: Record<string, any> = {
        createdById: ctx.user.id,
      };

      if (input?.keywords && input?.keywords.length > 0) {
        where.keywords = {
          some: {
            keywordId: {
              in: input.keywords,
            },
          },
        };
      }
      return await ctx.db.story.findMany({
        where,
        include: { createdBy: true, keywords: { include: { keyword: true } } },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  approvedStories: protectedProcedure
    .input(z.object({ keywords: z.array(z.number()).optional() }))
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const where: Record<string, any> = {
        status: "APPROVED",
      };

      if (input?.keywords && input?.keywords.length > 0) {
        where.keywords = {
          some: {
            keywordId: {
              in: input.keywords,
            },
          },
        };
      }
      return await ctx.db.story.findMany({
        where,
        include: { createdBy: true, keywords: { include: { keyword: true } } },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
