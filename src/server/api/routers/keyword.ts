import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const keywordRouter = createTRPCRouter({

    create: protectedProcedure
        .input(z.object(
            {
                name: z.string().min(1)
            }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.keyword.create({
                data: {
                    name: input.name
                },
            });
        }),

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.db.keyword.findMany();
    }),

    updateOne: protectedProcedure
        .input(z.object(
            {
                id: z.number(),
                name: z.string()

            }))
        .mutation(async ({ ctx, input }) => {
            const data = {
                name: input.name
            }
            console.log("input upfate===================", input);
            return ctx.db.keyword.update({
                where: { id: input.id },
                data,
            });
        }),

    deleteOne: protectedProcedure
        .input(z.object(
            {
                id: z.number()

            }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.keyword.delete({
                where: { id: input.id },
            });
        }),


});
