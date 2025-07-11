import {
  PlayIcon,
  AwardIcon,
  InfinityIcon,
  BookMarkedIcon,
  PlayCircleIcon,
  BadgeMinusIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { FunctionComponent } from "react";

import { cartState } from "@/state/cart";
import { Button } from "@/components/ui/button";
import { CourseDetails } from "@/typings/course";
import { courseContentDialogState } from "@/state/course";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface CourseDetailCardProps {
  details: CourseDetails;
}

const CourseDetailCard: FunctionComponent<CourseDetailCardProps> = ({
  details,
}) => {
  const [cart, setCart] = useRecoilState(cartState);
  const added = cart.find((i) => i.id === details.id);
  const [_sop, setOpenPreview] = useRecoilState(courseContentDialogState);

  const handleAddToCart = () => {
    const exist = cart.find((i) => i.id === details.id);
    if (!exist) setCart([...cart, details]);
  };

  const handleRemoveFromCart = () => {
    const _cart = cart.filter((i) => i.id !== details.id);
    setCart(_cart);
  };

  return (
    <Card className="overflow-hidden max-w-3xl rounded-sm">
      <CardHeader className="p-0 w-full">
        <div className="relative">
          <Image
            width={400}
            height={200}
            alt={details.title}
            src={details.thumbnail}
          />
          <Button
            onClick={() => setOpenPreview(true)}
            className="rounded-none hover:bg-primary/50 inline-flex flex-col items-center justify-center absolute bg-black/50 backdrop-blur-sm top-0 left-0 h-full w-full gap-y-4"
          >
            <PlayIcon className="h-12 w-12 text-white" />
            <p className="text-white">Preview this course</p>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-3 space-y-2">
        <h3 className="text-3xl font-bold opacity-80 text">
          {details.billingType === "Free"
            ? "Free for lifetime"
            : `${details.price}PKR`}
        </h3>
        <Button
          variant={added ? "outline" : "default"}
          className="w-full inline-flex items-center gap-2"
          onClick={added ? handleRemoveFromCart : handleAddToCart}
        >
          {added ? (
            <>
              <BadgeMinusIcon className="h-5 w-5" /> Remove from cart
            </>
          ) : (
            <>
              <ShoppingBagIcon className="h-5 w-5" /> Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full inline-flex items-center gap-2"
        >
          <BookMarkedIcon className="h-5 w-5" />
          Enroll Now
        </Button>

        <div className="space-y-3">
          <p className="font-semibold text-foreground mb-2">
            This course include
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <PlayCircleIcon className="h-5 w-5" />
            {details.lecturesCount} high quality video lectures
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <AwardIcon className="h-5 w-5" />
            Course Completion Certificate
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <InfinityIcon className="h-5 w-5" />
            Full lifetime access
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseDetailCard;
