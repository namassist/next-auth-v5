"use server";

import { auth, signIn } from "@/auth";
import { signInSchema } from "@/lib/schema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const doCredentialLogin = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = signInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });

    const session = await auth();
    if (session) {
      if (session?.user?.role === "USER") {
        redirect("/user/dashboard");
      } else if (session?.user?.role === "ADMIN") {
        redirect("/admin/dashboard");
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials" };
        default:
          return { message: "Something went wronng" };
      }
    }
    throw error;
  }
};
