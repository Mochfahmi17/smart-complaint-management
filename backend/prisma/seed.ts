import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = ["Pipa/Air - Kebocoran, keran rusak, toilet bermasalah", "Listrik - Lampu mati, korsleting, stop kontak rusak", "Kebersihan - Sampah, area kotor, maintance umum", "Keamanan - CCTV, akses masuk, keamanan lingkungan"];

  const category = await Promise.all(categories.map((category) => prisma.category.create({ data: { name: category } })));

  console.log("Successfull to seed category!", category);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
