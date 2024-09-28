import React from "react";
import { auth } from "@/auth";
import { getUserInfo } from "@/lib/data";

export default async function Page() {
  const session = await auth();

  if (session) {
    const userLogin = await getUserInfo(session.accessToken);

    return (
      <section className="py-5">
        <pre>{JSON.stringify(userLogin, null, 2)}</pre>
      </section>
    );
  }
}
