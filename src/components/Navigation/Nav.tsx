import Link from "next/link";
import { List } from "../BaseComponents/List/List";
import { ListItem } from "../BaseComponents/ListItem/ListItem";
import { Button } from "../BaseComponents/Button/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useThemeContext } from "@/hooks/useThemeContext";

export const Nav = () => {
  const { status } = useSession();
  const { toggleTheme } = useThemeContext();

  const navItems = [
    { href: "/", text: "Home" },
    { href: "/notes", text: "Notatki" },
  ];

  return (
    <div className="flex h-16 w-full flex-row items-center justify-between border-b-2 p-4 text-2xl">
      <Button type="button" text="Toggle theme" onClick={toggleTheme} />
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
