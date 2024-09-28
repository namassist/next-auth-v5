"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormState } from "react-dom";
import { doCredentialLogin } from "@/app/actions";
import { Label } from "@radix-ui/react-label";
import { LoginButton } from "./_components/button";

export default function LoginForm() {
  const [state, formAction] = useFormState(doCredentialLogin, null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.message ? (
          <div
            className="p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-medium">{state?.message}</span>
          </div>
        ) : null}
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="m@example.com" />
            <span className="text-[0.8rem] font-medium text-destructive">
              {state?.error?.email}
            </span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
            <span className="text-[0.8rem] font-medium text-destructive">
              {state?.error?.password}
            </span>
          </div>
          <LoginButton />
        </form>
      </CardContent>
    </Card>
  );
}
