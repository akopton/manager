import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  addNote: protectedProcedure
    .input(z.object({}))
    .mutation(({ ctx, input }) => {}),

  addList: protectedProcedure
    .input(z.object({}))
    .mutation(({ ctx, input }) => {}),

  getLists: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
  }),
});
