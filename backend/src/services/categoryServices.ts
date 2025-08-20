import prisma from "../lib/prisma";

export const allCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    throw error;
  }
};
