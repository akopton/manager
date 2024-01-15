import { createTRPCRouter } from "@/server/api/trpc";
import { notesRouter } from "./routers/notes";
import { notesListRouter } from "./routers/notesList";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  notes: notesRouter,
  notesList: notesListRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
