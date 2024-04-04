import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircleIcon, MoveLeftIcon } from "lucide-react";
import { FunctionComponent, useEffect, useState } from "react";

import LoginForm from "./LoginForm";
import { Button } from "@/components/ui/button";
import { useGetCookieKeys } from "@/hooks/auth";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const { refresh: rKey, session: sKey } = useGetCookieKeys();

  useEffect(() => {
    // const h = async () => {
    //   const session = getCookie(sKey);
    //   const refreshKey = getCookie(rKey);
    //   if (!sessionKey) {
    //   }
    //   if (!session) {
    //     setShowLoginForm(true);
    //     return;
    //   }
    //   const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    //   const url = endpoint + "/user";
    //   try {
    //     const res = await fetch(url, {
    //       headers: { Authorization: `Bearer ${session}` },
    //     });
    //     const user = await res.json();
    //     if (!user.id) throw new Error("user not found");
    //     router.replace("/");
    //   } catch (err) {
    //     console.log(err);
    //     setShowLoginForm(true);
    //   }
    // };
    // h();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="hidden lg:block p-12 w-1/2 h-full bg-cover bg-center bg-[url('https://usc1.contabostorage.com/b98faa9cfd974e509544082fb8f8ad5e:public/website/login_cover_img.jpg')]">
        <div className="h-full flex flex-col justify-between">
          <div>
            <Button
              variant="ghost"
              className="flex items-center gap-x-2 hover:bg-background/20"
            >
              <MoveLeftIcon className="h-5 w-5" /> Go Back
            </Button>
          </div>
          <div className="text-white">
            <span className="hidden">Bottom</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="h-full w-auto md:w-1/2  flex flex-col items-center justify-center">
        <div className="block lg:hidden">
          <Button
            variant="ghost"
            className="flex items-center gap-x-2 hover:bg-background/20"
          >
            <MoveLeftIcon className="h-5 w-5" /> Go Back
          </Button>
        </div>
        {showLoginForm ? (
          <div className="max-w-sm w-full text-center space-y-4">
            <div className="">
              <Image
                width={300}
                height={100}
                alt="LearnLoom"
                src="/img/logo.png"
                className="mx-auto"
              />
            </div>
            <div>
              <h3 className="tracking-tight text-3xl font-semibold text-foreground">
                Sign in to your account
              </h3>
              <p className="text-sm text-foreground/70">
                sign in with an existing email account
              </p>
            </div>

            <LoginForm error={searchParams.get("error") || undefined} />
          </div>
        ) : (
          <div className="text-center w-full flex items-center justify-center">
            <div>
              <LoaderCircleIcon className="animate-spin h-5 w-5 text-primary" />
            </div>
            <Separator
              orientation="vertical"
              className="h-5 mx-1 bg-foreground/30"
            />
            <div>
              <p className="text-center text-sm text-foreground/80">
                Authenticating
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
