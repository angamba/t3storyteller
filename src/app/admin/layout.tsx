"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import GetMenu from "../_components/get-menu";
import { api } from "~/trpc/react";
import { type User } from "@prisma/client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: profile, isPending } = api.user.profile.useQuery();

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav className="flex justify-between bg-gray-800 p-4 text-white ">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <GetMenu profile={profile as unknown as User} />
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
