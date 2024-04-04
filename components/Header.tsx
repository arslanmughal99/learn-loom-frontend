import {
  HomeIcon,
  MenuIcon,
  BellIcon,
  LucideIcon,
  FileStackIcon,
  BadgeHelpIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { deleteCookie } from "cookies-next";

import Link from "next/link";
import { Input } from "./ui/input";
import { cn } from "@/utils/utils";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { useShowHeader } from "../hooks/header";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetCookieKeys, useGetUserAuthInfo } from "@/hooks/auth";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import CartButton from "./CartButton";

const links: {
  href: string;
  title: string;
  icon: LucideIcon;
}[] = [
  { href: "/", title: "Home", icon: HomeIcon },
  { href: "/courses", title: "Courses", icon: FileStackIcon },
  { href: "/support", title: "Support", icon: BadgeHelpIcon },
];

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const router = useRouter();
  const { show: showHeader } = useShowHeader();
  const { refresh, session } = useGetCookieKeys();
  const { user, isLoading } = useGetUserAuthInfo();

  const logout = () => {
    deleteCookie(session);
    deleteCookie(refresh);
    router.replace("/");
    router.reload();
  };

  return (
    <header
      className={cn(
        "sticky shadow-sm border bg-background h-20 top-0 z-30 w-full lg:px-12 px-4",
        showHeader
          ? "transition translate-y-0 duration-200"
          : "transition -translate-y-52 duration-200"
      )}
    >
      <div className="h-full flex items-center justify-between gap-x-2">
        {/* DESKTOP LOGO AND LINK SECTION */}
        <div className="hidden h-full md:flex items-center justify-start gap-x-8 min-w-[200px] max-w-[200px]">
          <div>
            <Image
              width={500}
              height={500}
              alt="LearnLoom"
              src="/img/logo.png"
              className="min-h-[50px]"
            />
          </div>
          {/* <div>
            <nav className="flex items-center gap-x-4 mr-4">
              {links.map((l, key) => (
                <Link
                  href={l.href}
                  key={key}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-foreground/80 font-semibold"
                  )}
                >
                  {l.title}
                </Link>
              ))}
            </nav>
          </div> */}
        </div>

        {/* MOBILE MENU */}
        <div className="block md:hidden">
          <Popover>
            <PopoverTrigger
              className={
                (cn("rounded-full"), buttonVariants({ variant: "secondary" }))
              }
            >
              <MenuIcon className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto">
              <nav className="flex flex-col items-start gap-x-4 mr-4">
                {links.map((l, key) => (
                  <Link
                    href={l.href}
                    key={key}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-foreground/80 font-semibold"
                    )}
                  >
                    {l.title}
                  </Link>
                ))}
              </nav>
            </PopoverContent>
          </Popover>
        </div>

        {/* MIDDLE SECTION */}
        <div className="w-full text-center">
          <Input
            name="search"
            placeholder="Search: Graphics Design"
            className="hidden md:block h-12 w-full focus:border-primary px-8 focus-visible:border-primary outline-none rounded-full bg-background text-lg placeholder:text-muted-foreground/50"
          />
          <Image
            width={500}
            height={500}
            alt="LearnLoom"
            src="/img/logo.png"
            className="block md:hidden md:min-h-[80px] md:max-h-[80px] w-auto mx-auto"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between gap-x-2 text-right">
          <div className="hidden md:block">
            <nav className="flex items-center gap-x-4 mr-4">
              {links.map((l, key) => (
                <Link
                  href={l.href}
                  key={key}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-foreground/80 font-semibold"
                  )}
                >
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <CartButton />
          </div>
          {isLoading && <Skeleton className="w-[50px] h-[50px] rounded-full" />}
          {!isLoading &&
            (!!user ? (
              <>
                <div>
                  <Button
                    variant="ghost"
                    className="p-2 rounded-full text-foreground/70"
                  >
                    <BellIcon className="h-6 w-6" />
                  </Button>
                </div>

                <Popover>
                  <PopoverTrigger className="rounded-full">
                    <Avatar>
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback className="bg-primary/90 text-background">
                        {user.firstName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-auto">
                    <div className="flex items-center gap-x-4">
                      <div>
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={user.profileImage} />
                          <AvatarFallback className="bg-primary/50">
                            {user.firstName[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground/90">
                          {user.firstName} {user.lastName}
                        </h3>
                        <h6 className="text-md text-foreground/70">
                          {user.email}
                        </h6>
                      </div>
                    </div>
                    <Separator className="w-full my-2" />

                    <div className="flex flex-col items-start">
                      <Link
                        href="/student/learning"
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "text-foreground/80 text-md font-semibold"
                        )}
                      >
                        My Learning
                      </Link>
                      <Link
                        href="/points"
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "text-foreground/80 text-md font-semibold"
                        )}
                      >
                        Reward Points
                      </Link>
                      {user.role === "Instructor" && (
                        <Link
                          href="/points"
                          className={cn(
                            buttonVariants({ variant: "link" }),
                            "text-foreground/80 text-md font-semibold"
                          )}
                        >
                          Instructor Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account-settings"
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "text-foreground/80 text-md font-semibold"
                        )}
                      >
                        Account Settings
                      </Link>
                    </div>
                    <Separator className="my-2" />
                    <Button className="w-full" onClick={logout}>
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Link
                href="/login"
                className={buttonVariants({ variant: "default" })}
              >
                Login
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
