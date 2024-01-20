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
        sharedWith: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, listId, title, text, sharedWith } = input;

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
            sharedWith: {
              connect: sharedWith.map((userId) => ({ id: userId })),
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
          sharedWith: {
            connect: sharedWith.map((userId) => ({ id: userId })),
          },
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
        include: {
          sharedWith: true,
        },
      });

      return note;
    }),

  getSharedNotesForUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const sharedNotes = await ctx.db.note.findMany({
        where: {
          sharedWith: {
            some: {
              id: userId,
            },
          },
        },
      });

      return sharedNotes;
    }),
});
