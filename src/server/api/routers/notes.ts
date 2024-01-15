import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  saveNote: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string(),
        text: z.string(),
        listId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, listId, title, text } = input;

      if (id) {
        const note = await ctx.db.note.update({
          where: {
            id: id,
          },
          data: {
            title,
            text,
            list: {
              connect: {
                id: listId,
              },
            },
          },
        });

        return note;
      }

      const note = await ctx.db.note.create({
        data: {
          title,
          text,
          list: { connect: { id: listId } },
        },
      });

      return note;
    }),

  getNoteById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const note = await ctx.db.note.findUnique({
        where: {
          id: input,
        },
      });

      return note;
    }),
});
