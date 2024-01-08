import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addListToUser = async (name: string, userId: string) => {
  await prisma.notesList.create({
    data: {
      name,
      owner: { connect: { id: userId } },
    },
  });
};

export const initNotesLists = async (userId: string) => {
  const defaultListName = "Twoje notatki";
  const sharedListName = "Udostępnione";

  const lists = await prisma.notesList.findMany({
    where: {
      ownerId: userId,
    },
  });

  const hasDefaultList = lists.find((el) => el.name === defaultListName);
  const hasSharedList = lists.find((el) => el.name === sharedListName);

  if (!hasDefaultList) {
    await addListToUser(defaultListName, userId);
  }

  if (!hasSharedList) {
    await addListToUser(sharedListName, userId);
  }

  return prisma.$disconnect();
};
