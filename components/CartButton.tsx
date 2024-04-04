import Image from "next/image";
import { truncate } from "lodash";
import { useRecoilState } from "recoil";
import { FunctionComponent } from "react";
import { ShoppingCartIcon, Trash } from "lucide-react";

import { cn } from "../utils/utils";
import { cartState } from "../state/cart";
import { Button, buttonVariants } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useGetCookieKeys } from "../hooks/auth";

interface CartButtonProps {}

const CartButton: FunctionComponent<CartButtonProps> = () => {
  const { session: sKey } = useGetCookieKeys();
  const [cart, setCart] = useRecoilState(cartState);

  const handleRemoveFromCart = (id: number) => {
    const _cart = cart.filter((i) => i.id !== id);
    setCart(_cart);
  };

  const handleEnroll = async () => {
    
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="relative text-secondary-foreground">
          {cart.length > 0 && (
            <span
              className={cn(
                "absolute -top-1 right-1 animate-bounce inline-flex items-center justify-center text-background text-xs ring-[3px] ring-background bg-primary rounded-full h-5 w-5"
              )}
            >
              {cart.length}
            </span>
          )}

          <ShoppingCartIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="z-50 bg-background/80 backdrop-blur-md shadow-sm"
      >
        {cart.length > 0 ? (
          <>
            <ul
              role="list"
              className="h-max-[300px] overflow-y-scroll mb-2 rounded-md ring-1 ring-muted divide-y divide-background"
            >
              {cart.map((c) => (
                <li key={c.id} className="flex items-center">
                  <Image
                    height={100}
                    width={200}
                    alt={c.title}
                    src={c.thumbnail}
                    className="h-16 w-16 flex-none rounded-l-md border border-gray-200"
                  />
                  <div className="ml-1 flex-auto w-[60%]">
                    <h3 className="text-sm font-regular text-foreground">
                      <a href="#">{truncate(c.title, { length: 20 })}</a>
                    </h3>
                    {c.billingType === "Free" ? (
                      <p className="text-primary">Free</p>
                    ) : (
                      <p className="text-primary">{c.price} PKR</p>
                    )}
                  </div>
                  <Button
                    variant="link"
                    onClick={() => handleRemoveFromCart(c.id)}
                  >
                    <Trash />
                  </Button>
                </li>
              ))}
            </ul>
            <Button className="w-full">Enroll Now</Button>

            <p className="text-center">
              <a href="#" className={buttonVariants({ variant: "link" })}>
                View Cart
              </a>
            </p>
          </>
        ) : (
          <p className="text-center">Your cart is empty</p>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CartButton;
