import "server-only";

import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@repo/db";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await verifyJwt(cookie);

  if (!session?.userSessionId) {
    redirect("/login");
  }

  return { isAuth: true, userSessionId: session.userSessionId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await prisma.user.findMany({
      where: {
        session: {
          some: {
            id: session.userSessionId,
          },
        },
      },
    });
    const user = data[0];
    return user;
  } catch (error) {
    console.error("Failed to fetch user:" + error);
    return null;
  }
});
