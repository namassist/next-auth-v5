import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1).email("Invalid Email"),
  password: z.string().min(8, "Password must be more than 8 characters"),
});
