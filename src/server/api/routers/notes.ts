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
      const currentUserId = ctx.session.user.id;
      const { id, listId, title, text, sharedWith } = input;

      if (id) {
        const note = await ctx.db.note.update({
          where: { id },
          data: {
            title,
            text,
            sharedWith: {
              set: [],
              connect: sharedWith.map((userId) => ({ id: userId })),
            },
            lastUpdatedBy: currentUserId,
          },
        });

        return note;
      }

      const note = await ctx.db.note.create({
        data: {
          title,
          text,
          list: { connect: { id: listId } },
          sharedWith: { connect: sharedWith.map((userId) => ({ id: userId })) },
          lastUpdatedBy: currentUserId,
        },
      });

      return note;
      // const sharedLists = await ctx.db.notesList.findMany({
      //   where: {
      //     name: "Udostępnione",
      //     ownerId: { in: sharedWith },
      //   },
      // });

      // const sharedListsIds = sharedLists.map((list) => list.id);

      // if (id) {
      //   const existingNote = await ctx.db.note.findUnique({ where: { id } });

      //   const note = await ctx.db.note.update({
      //     where: { id },
      //     data: {
      //       title,
      //       text,
      //       lists: {
      //         set: [],
      //         connect: [...sharedListsIds, existingNote?.listId].map(
      //           (listId) => ({ id: listId }),
      //         ),
      //       },
      //     },
      //   });

      //   return note;
      // }

      // const note = await ctx.db.note.create({
      //   data: {
      //     title,
      //     text,
      //     lists: {
      //       connect: [...sharedListsIds, listId].map((listId) => ({
      //         id: listId,
      //       })),
      //     },
      //     listId,
      //     lastUpdatedBy: currentUserId,
      //   },
      // });

      // return note;
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
});
