import Link from "next/link";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useToggle } from "@uidotdev/usehooks";
import { FunctionComponent, useState } from "react";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetCookieKeys } from "@/hooks/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface LoginFormProps {
  error?: string;
}

type LoginForm = {
  username: string;
  password: string;
};

const LoginForm: FunctionComponent<LoginFormProps> = ({ error }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useToggle(false);
  const { refresh: rKey, session: sKey } = useGetCookieKeys();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<LoginForm>({
    mode: "onSubmit",
    defaultValues: { password: "", username: "" },
  });

  async function onSubmit(values: LoginForm) {
    setIsLoading(true);
    console.log(values);
    const { password, username } = values;
    const url = endpoint + "/login";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const token = await res.json();
      setCookie(sKey, token.accessToken);
      setCookie(rKey, token.refreshToken);
      router.replace("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              {...register("username")}
              autoCorrect="off"
              disabled={isLoading}
              autoCapitalize="none"
              autoComplete="username"
              placeholder="name@example.com"
            />
          </div>
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              {...register("password")}
              autoCorrect="off"
              disabled={isLoading}
              autoCapitalize="none"
              autoComplete="password"
              placeholder="password"
              type={showPassword ? "text" : "password"}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword()}
              className="rounded-full absolute inset-y-0 right-1 h-9 w-9 p-0"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </Button>
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login with Email
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or login with
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled>
        {isLoading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconBrandGoogle className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/facebook/auth`}
        className={buttonVariants({ variant: "outline" })}
      >
        {isLoading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconBrandFacebook className="mr-2 h-4 w-4" />
        )}{" "}
        Facebook
      </Link>
      <Label className="text-red-500 text-center">{error}</Label>
    </div>
  );
};

export default LoginForm;
