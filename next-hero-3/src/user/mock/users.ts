import { faker } from "@faker-js/faker/locale/es_MX";

import { prisma } from "@/core/lib/prisma";
import { createUser } from "@/user/action/create";

export async function generateUsers(rowNumber = 100) {
  await Promise.all(
    Array.from({ length: rowNumber }).map(async (_, i) => {
      const user = await createUser({
        name: faker.person.fullName({ sex: "female" }),
        email: `${i}@mail.com`,
        password: "12345678",
      });

      if (typeof user === "string") {
        await prisma.user.update({
          where: {
            id: user,
          },
          data: {
            image: faker.image.personPortrait({ sex: "female", size: 128 }),
          },
        });
      }
    }),
  );

  return;
}
