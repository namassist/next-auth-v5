import { signOut } from "@/auth";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="w-full flex flex-col gap-6 text-lg font-medium md:flex-row md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          Auth-App
        </Link>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-5 lg:gap-6">
          <Link
            href=""
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/auth/login" });
            }}
          >
            <Button size="sm" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </nav>
    </header>
  );
};
