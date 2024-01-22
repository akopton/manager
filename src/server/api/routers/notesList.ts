import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Note, Prisma } from "@prisma/client";

type NotesListWithNotes = Prisma.NotesListGetPayload<{
  include: { notes: true };
}>[];

const populateSharedNotesList = (array: NotesListWithNotes, notes: Note[]) => {
  const sharedListName = "Udostępnione";
  const sharedList = array.find((list) => list.name === sharedListName);
  const newLists = array.filter((list) => list.name !== sharedListName);

  if (sharedList) {
    newLists.push({ ...sharedList, notes: notes });
  }

  return newLists;
};

export const notesListRouter = createTRPCRouter({
  addList: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const list = ctx.db.notesList.create({
      data: {
        name: input,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return list;
  }),

  getLists: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    //get shared notes

    const notes = await ctx.db.note.findMany({
      where: {
        sharedWith: {
          some: {
            id: userId,
          },
        },
      },
    });

    const lists = await ctx.db.notesList.findMany({
      where: {
        ownerId: userId,
      },
      include: { notes: true },
    });

    const newLists = populateSharedNotesList(lists, notes);

    return newLists;
  }),

  getListById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const list = await ctx.db.notesList.findUnique({
        where: {
          id: input,
        },
      });

      return list;
    }),
});
