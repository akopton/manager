import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  addNew: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        isCyclic: z.boolean().optional(),
        timePeriod: z.number().optional(),
        endAt: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, date, isCyclic, timePeriod, endAt } = input;
      const userId = ctx.session.user.id;

      const event = await ctx.db.event.create({
        data: {
          name,
          date,
          isCyclic,
          timePeriod,
          endAt,
          user: { connect: { id: userId } },
        },
      });

      return event;
    }),
});
