import "server-only";

import { cookies } from "next/headers";
import { prisma } from "@repo/db";
import { signJwt, verifyJwt } from "./jwt";

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  // 1. 把用户记录到 session 表中
  const userSession = await prisma.userSession.create({
    data: {
      userId,
      expiresAt,
    },
  });
  // 2. 生成 JWT
  const session = await signJwt({ userSessionId: userSession.id, expiresAt });
  // 3. 设置 cookie
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await verifyJwt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
