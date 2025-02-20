import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function addTodo() {
  await client.todos.create({
    data: {
      id: 1,
      name: "db",
    },
  });
}

addTodo();
