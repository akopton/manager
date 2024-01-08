import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  addNote: protectedProcedure
    .input(z.object({}))
    .mutation(({ ctx, input }) => {}),

  addList: protectedProcedure
    .input(z.object({}))
    .mutation(({ ctx, input }) => {}),

  getLists: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const lists = await ctx.db.notesList.findMany({
      where: {
        ownerId: userId,
      },
      include: { notes: true },
    });

    return lists;
  }),
});
