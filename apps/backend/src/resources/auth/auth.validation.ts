import { z } from "zod";

export const ValidateLogin = z
  .object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(8),
  })
  .openapi("ValidateLogin");

export const ValidateRegister = z
  .object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email" }),
    name: z.string({ required_error: "name is required" }).min(3),
    password: z.string({ required_error: "password is required" }).min(8),
    confirmPassword: z
      .string({ required_error: "confirm password is required" })
      .min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({ code: "custom", message: "passwords do not match" });
    }
  })
  .openapi("ValidateRegister");
