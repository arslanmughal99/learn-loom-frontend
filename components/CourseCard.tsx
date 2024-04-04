import {
  LibraryIcon,
  BadgeMinusIcon,
  ShoppingBagIcon,
  CalendarPlus2Icon,
} from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import { truncate } from "lodash";
import { useRecoilState } from "recoil";
import { FunctionComponent } from "react";

import { Button } from "./ui/button";
import { Ratings } from "./ui/ratings";
import { cartState } from "../state/cart";
import { Course } from "../typings/course";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader, CardFooter, CardContent } from "./ui/card";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

const CourseCard: FunctionComponent<CourseCardProps> = ({ course }) => {
  const [cart, setCart] = useRecoilState(cartState);
  const added = cart.find((i) => i.id === course.id);

  const handleAddToCart = () => {
    const exist = cart.find((i) => i.id === course.id);
    if (!exist) setCart([...cart, course]);
  };

  const handleRemoveFromCart = () => {
    const _cart = cart.filter((i) => i.id !== course.id);
    setCart(_cart);
  };

  return (
    <Card className="overflow-hidden h-full max-w-4xl rounded">
      <CardHeader className="p-0 w-full">
        <div className="overflow-clip">
          <Image
            width={1000}
            height={200}
            alt={course.title}
            src={course.thumbnail}
            className="hover:scale-105 transition duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2 p-2 px-2 py-4 text-muted-foreground scroll-m-20 text-md font-semibold tracking-tight">
        <div className="inline-flex items-center justify-start gap-2">
          <Avatar>
            <AvatarImage src={course.instructor.profileImage} />
            <AvatarFallback>{course.instructor.firstName[0]}</AvatarFallback>
          </Avatar>

          <p className="text-sm font-semibold text-muted-foreground">
            {`${course.instructor.firstName ?? ""} ${
              course.instructor.lastName ?? ""
            }`}
          </p>
        </div>
        <div className="inline-flex items-center justify-end gap-2">
          <Image
            width={24}
            height={24}
            src={course.category.icon}
            alt={course.category.title}
          />
          <p className="text-sm font-normal text-muted-foreground/70 whitespace-nowrap">
            {course.category.title}
          </p>
        </div>
      </CardContent>
      <CardContent className="px-3 min-h-[90px]">
        <Link
          href={`/course/${course.id}`}
          className="text-2xl font-semibold tracking-tight text-foreground/80"
        >
          Learn how to {truncate(course.title, { length: 25 })}
        </Link>
      </CardContent>
      <CardFooter className="px-3 block">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm font-normal text-muted-foreground/70">
            <CalendarPlus2Icon className="h-5 w-5" />
            {dayjs(course.createdAt).format("DD/MM/YYYY").toString()}
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-normal text-muted-foreground/70">
            <LibraryIcon className="h-5 w-5" />
            {course.lectures} lectures
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <Ratings totalstars={5} variant="yellow" rating={course.rating} />
            {course.rating}
          </div>
          {course.billingType === "Free" ? (
            <h3 className="scroll-m-20 text-2xl text-primary/80 font-semibold tracking-tight">
              Free
            </h3>
          ) : (
            <h3 className="scroll-m-20 text-2xl text-primary/80 font-semibold tracking-tight">
              {course.price} PKR
            </h3>
          )}
        </div>
        <div className="mt-5">
          <Button
            className="w-full inline-flex items-center gap-4"
            variant={added ? "outline" : "default"}
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
