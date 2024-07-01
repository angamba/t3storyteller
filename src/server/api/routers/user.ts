import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  profile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
