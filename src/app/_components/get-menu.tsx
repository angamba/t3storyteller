"use client";

import { type User, type Role } from "@prisma/client";
import Link from "next/link";

interface MenuItem {
  name: string;
  link: string;
}

const menuItems: Record<Role, MenuItem[]> = {
  ADMIN: [
    { name: "Review Stories", link: "/admin/stories" },
    { name: "Keywords", link: "/admin/keywords" },
  ],
  //POSTER
  POSTER: [
    { name: "My Stories", link: "/poster/stories" },
    { name: "Create Story", link: "/poster/stories/create" },
  ],
  VIEWER: [{ name: "Stories", link: "/viewer/stories" }],
};

const GetMenu = ({ profile }: { profile: User }) => {
  // return <pre>{JSON.stringify(profile, null, 2)}</pre>;
  if (!profile?.role) {
    return null;
  }
  return (
    <div className="flex justify-center space-x-2">
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        menuItems[profile.role].map((item, index) => (
          <Link key={index} href={item.link}>
            {item.name}
          </Link>
        ))
      }
    </div>
  );
};

export default GetMenu;
