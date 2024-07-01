import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

export const followerRouter = createTRPCRouter({

    create: protectedProcedure
        .input(z.object({
            followingId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.follower.create({
                data: {
                    followerId: ctx.user.id, //my id
                    followingId: input.followingId
                },
            });
        }),

    getFollowingByUserId: protectedProcedure
        .input(z.object({ useId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.follower.findMany({
                where: { followerId: input.useId },
            });
        }),
});
