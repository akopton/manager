import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const loggedUser = ctx.session.user;
    const users = (await ctx.db.user.findMany({
      where: {
        id: {
          not: loggedUser.id
        }
      }
    }))
    return users;
  }),
});
