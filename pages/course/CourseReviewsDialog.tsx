import { Dialog, Transition } from "@headlessui/react";
import { LoaderCircleIcon, StarIcon, XIcon } from "lucide-react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";

import { Review } from "@/typings/review";
import CourseRatings from "./CourseRatings";
import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/ratings";
import { useGetCourseReviews } from "@/hooks/review";
import { CourseDetailsRating } from "@/typings/course";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CourseReviewsDialogProps {
  open: boolean;
  courseId: number;
  close: VoidFunction;
  rating: CourseDetailsRating;
}

const CourseReviewsDialog: FunctionComponent<CourseReviewsDialogProps> = ({
  close,
  open,
  rating,
  courseId,
}) => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isError } = useGetCourseReviews({
    courseId,
    size: 10,
    page: page,
  });
  const [total, setTotal] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!isError) {
      let newReviews = [...reviews];
      if (data && data.reviews) {
        newReviews = [...newReviews, ...data.reviews];
        setReviews(newReviews);
        setTotal(data!.total);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          close();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-background/80 backdrop-blur-md bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              leave="ease-in duration-200"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="mt-20 px-8 pt-4 pb-8 relative w-full rounded border md:max-w-2xl overflow-hidden lg:max-w-4xl bg-background">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <StarIcon className="h-6 w-6 fill-yellow-500 stroke-yellow-500" />
                      <h3 className="text-2xl font-semibold text-foreground">
                        {rating.average} course rating • {rating.total}
                      </h3>
                    </div>
                    <div>
                      <Button variant="ghost" onClick={close}>
                        <XIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start flex-col md:flex-row mt-5 gap-x-10 gap-y-10">
                    <div className="md:w-[610px]">
                      <CourseRatings rating={rating} />
                    </div>
                    <div className="w-full">
                      <ScrollArea className="w-full h-[calc(50vh)] rounded border">
                        <div className="divide-y-[1px]">
                          {reviews.map((r, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-x-4 py-4 px-2"
                            >
                              <Avatar className="h-24 w-24">
                                <AvatarFallback>
                                  {r.user.username[0]}
                                </AvatarFallback>
                                <AvatarImage src={r.user.profileImage} />
                              </Avatar>
                              <div className="text-left">
                                <p className="text-md font-semibold text-foreground/80">
                                  {r.user.username}
                                </p>
                                <Ratings variant="yellow" rating={r.rating} />
                                <p className="text-sm font-semibold text-foreground/60">
                                  {r.review}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-center mt-4">
                          <Button
                            variant="secondary"
                            disabled={isFetching || reviews.length >= total}
                            onClick={handleLoadMore}
                            className="inline-flex items-center gap-2"
                          >
                            {isFetching && (
                              <LoaderCircleIcon className="animate-spin h-5 w-5" />
                            )}
                            {reviews.length >= total
                              ? "No more reviews"
                              : "Load More"}
                          </Button>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CourseReviewsDialog;
