import Link from "next/link";
import { List } from "../BaseComponents/List/List";
import { ListItem } from "../BaseComponents/ListItem/ListItem";
import { Button } from "../BaseComponents/Button/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useThemeContext } from "@/hooks/useThemeContext";
import { ToggleThemeBtn } from "../BaseComponents/ToggleThemeBtn/ToggleThemeBtn";

export const Nav = () => {
  const navItems = [
    { href: "/", text: "Home" },
    { href: "/notes", text: "Notatki" },
    { href: "/planned", text: "Zaplanowane" },
  ];

  const session = useSession();

  return (
    <div className="flex h-16 w-full flex-row items-center justify-between border-b-2 p-4 text-2xl">
      <ToggleThemeBtn />
      <div>{session.data?.user.email}</div>
      <List
        direction="row"
        gap="20px"
        style={{ justifyContent: "flex-end", alignItems: "center" }}
      >
        {navItems.map((item) => (
          <ListItem key={item.href}>
            <Link href={item.href}>{item.text}</Link>
          </ListItem>
        ))}
        <ListItem>
          <Button type="button" text={"Wyloguj"} onClick={() => signOut()} />
        </ListItem>
      </List>
    </div>
  );
};
