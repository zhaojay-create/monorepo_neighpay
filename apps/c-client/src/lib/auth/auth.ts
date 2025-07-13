"use server";

import bcrypt from "bcrypt";
import { prisma } from "@repo/db";
import { FormState, SignupFormSchema } from "./definitions";
import { createSession } from "./session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // 1.校验数据
  const validatedFields = SignupFormSchema.safeParse({
    phone: formData.get("phone"),
    password: formData.get("password"),
    redirectUrl: formData.get("redirectUrl"),
  });

  // 如果有表单不符合，就返回提示出错误
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. 准备好，插入数据库要使用到的数据
  const { phone, password, redirectUrl } = validatedFields.data;

  // 3. 查询用户是否存在
  const existingUser = await prisma.user.findUnique({
    where: { phone },
  });

  // 4.如果存在，就登录
  if (existingUser) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return {
        message: "密码错误,请重试",
      };
    }
    // 密码正确，创建 session 并重定向
    await createSession(existingUser.id);
    redirect(redirectUrl || "/dashboard");
  } else {
    // 5. 如果不存在，就注册
    const hashedPassword = await bcrypt.hash(password, 10);
    // 用户插入数据库
    const user = await prisma.user.create({
      data: {
        name: "user" + Math.random().toString(36).slice(2, 6), // 自动生成名字
        phone,
        password: hashedPassword,
      },
    });

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    // 6. 创建用户session
    await createSession(user.id);
    // 7. 重定向
    redirect(redirectUrl || "/dashboard");
  }
}
