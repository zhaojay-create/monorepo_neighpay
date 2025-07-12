import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

// 创建扩展后的 Prisma 实例
const prismaClient = new PrismaClient().$extends(withAccelerate());

// 用 typeof 自动推导类型
const globalForPrisma = globalThis as unknown as {
  prisma: typeof prismaClient;
};

export const prisma = globalForPrisma.prisma || prismaClient;

// 缓存到 globalThis（防止热更新重复创建）
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
