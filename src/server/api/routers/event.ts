import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  save: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        date: z.date(),
        isCyclic: z.boolean().optional(),
        timePeriod: z.number().optional(),
        endAt: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, date, isCyclic, timePeriod, endAt } = input;
      const userId = ctx.session.user.id;

      if (id) {
        const event = await ctx.db.event.update({
          where: {
            id,
          },
          data: {
            name,
            date,
            isCyclic,
            timePeriod,
            endAt,
          },
        });
        return event;
      }

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
