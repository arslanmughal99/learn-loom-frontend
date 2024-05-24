import { setCookie } from "cookies-next";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { useGetCookieKeys } from "../../hooks/auth";
import { decode } from "jsonwebtoken";

interface FacebookAuthProps {}

const FacebookAuth: FunctionComponent<FacebookAuthProps> = () => {
  const { session: sKey, refresh: rKey } = useGetCookieKeys();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [showGoBack, setShowGoBack] = useState(false);

  const handleFacebookAuth = async () => {
    if (!code) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/facebook/redirect?code=${code}`,
        { cache: "no-store" }
      );
      const token = await res.json();

      if (token.accessToken && token.refreshToken) {
        const aToken = decode(token.accessToken, {
          json: true,
          complete: true,
        })?.payload as any;

        const rToken = decode(token.refreshToken, {
          json: true,
          complete: true,
        })?.payload as any;

        setCookie(sKey, token.accessToken, {
          maxAge: aToken.exp - aToken.iat,
          expires: new Date(aToken.exp * 1000),
        });

        setCookie(rKey, token.refreshToken, {
          maxAge: rToken.exp - rToken.iat,
          expires: new Date(rToken.exp * 1000),
        });

        router.replace("/courses");
      } else {
        router.replace("/login?error=Facebook authentication failed");
      }
    } catch (err) {
      console.log(err);
      router.replace("/login?error=Something went wrong");
    }
  };

  useEffect(() => {
    handleFacebookAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="flex items-center justify-center h-screen object-center">
      <LoaderCircle className="animate-spin text-primary" />
      <Separator orientation="vertical" className="h-10 mx-2" />
      <h6>Authenticating with facebook</h6>
    </div>
  );
};

export default FacebookAuth;
