import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  addNote: protectedProcedure
    .input(
      z.object({ title: z.string(), text: z.string(), listId: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const { listId, title, text } = input;
      const note = await ctx.db.note.create({
        data: {
          title,
          text,
          list: { connect: { id: listId } },
        },
      });

      return note;
    }),

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

  getNoteById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const note = ctx.db.note.findUnique({
      where: {
        id: input,
      },
    });

    return note;
  }),
});
