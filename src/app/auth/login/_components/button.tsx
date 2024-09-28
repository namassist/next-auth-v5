import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Authenticating..." : "Sign In"}
    </Button>
  );
};
