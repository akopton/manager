import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { connect } from "http2";

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
      // find all lists that are owned by users in sharedWith array
      const sharedLists = await ctx.db.notesList.findMany({
        where: {
          name: "Udostępnione",
          ownerId: { in: sharedWith },
        },
      });

      const listsIds = [...sharedLists.map((list) => list.id), listId];

      if (id) {
        const note = await ctx.db.note.update({
          where: { id },
          data: {
            title,
            text,
            lists: {
              connect: listsIds.map((id) => ({ id: id })),
            },
          },
        });

        return note;
      }

      const note = await ctx.db.note.create({
        data: {
          title,
          text,
          lists: {
            connect: listsIds.map((id) => ({ id: id })),
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
          lists: {
            where: {
              ownerId: ctx.session.user.id,
            },
          },
        },
      });

      const sharedWith = await ctx.db.user.findMany({
        where: {
          notesLists: {
            some: {
              notes: {
                some: {
                  id: note?.id,
                },
              },
              owner: {
                id: {
                  not: ctx.session.user.id,
                },
              },
            },
          },
        },
        select: { id: true },
      });

      if (note) {
        const { lists, ...noteWithoutLists } = note;
        if (lists[0])
          return {
            ...noteWithoutLists,
            listId: lists[0].id,
            sharedWith: sharedWith.map((user) => user.id),
          };
      }
    }),
});
