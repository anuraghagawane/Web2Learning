import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function init() {
  await client.todos.create({
    data: {
      id: 5,
      name: "dbb",
      completed: true,
    },
  });
}

init();
