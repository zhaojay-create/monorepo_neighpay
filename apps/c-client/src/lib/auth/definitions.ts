import { z } from "zod";

export const SignupFormSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, {
    message: "请输入有效的 11 位手机号码",
  }),
  password: z.string().min(6, { message: "Be at least 6 characters long" }),
  // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  // .regex(/[0-9]/, { message: "Contain at least one number." })
  // .regex(/[^a-zA-Z0-9]/, {
  //   message: "Contain at least one special character.",
  // })
  // .trim(),
  redirectUrl: z.string(),
});

export type FormState =
  | {
      errors?: {
        phone?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userSessionId: string;
  expiresAt: Date;
};
