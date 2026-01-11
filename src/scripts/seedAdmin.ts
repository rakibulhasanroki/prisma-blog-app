import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    console.log("**** admin creation started");
    const adminData = {
      name: process.env.ADMIN_NAME as string,
      email: process.env.ADMIN_EMAIL as string,
      role: UserRole.ADMIN,
      password: process.env.ADMIN_PASS as string,
    };
    console.log("***existing checking");
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!!");
    }
    console.log("existing pass");
    const adminUser = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:4000",
        },
        body: JSON.stringify(adminData),
      }
    );

    if (adminUser.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
}

seedAdmin();
