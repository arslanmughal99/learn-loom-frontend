import Link from "next/link";
import Image from "next/image";
import { truncate } from "lodash";
import { getCookie } from "cookies-next";
import { FunctionComponent, useState } from "react";
import { EllipsisVertical, Loader2Icon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/utils";
import { useGetCookieKeys } from "@/hooks/auth";
import { Ratings } from "@/components/ui/ratings";
import { Progress } from "@/components/ui/progress";
import { useGetEnrollments } from "@/hooks/enrollment";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ActiveLearningProps {
  refetchStats: () => void;
  status?: "Active" | "Archived" | "Completed";
}

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

const ActiveLearning: FunctionComponent<ActiveLearningProps> = ({
  status,
  refetchStats,
}) => {
  const { session: sKey } = useGetCookieKeys();
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading, isError } = useGetEnrollments({
    page,
    status,
    size: 12,
  });

  const handlePageBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageNext = () => {
    const total = data?.total || 0;
    const maxPage = Math.floor(total / 12);
    if (page <= maxPage) setPage(page + 1);
  };

  const handleStatusUpdate = async (
    id: number,
    status: "Active" | "Archived" | "Completed"
  ) => {
    const session = getCookie(sKey);
    const url = endpoint + "/enrollment/status";
    try {
      const resRaw = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ id, status }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
      });
      const res = await resRaw.json();

      if (res.id === id) {
        refetch();
        refetchStats();
        // TODO: Success
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* ENROLLMENT GRID SECTION */}
      {!isLoading && (!!data && data.total === 0) && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-600px)] max-w-4xl mx-auto">
          <div className="text-center">
            <Image
              alt="not found"
              width={100}
              height={100}
              src="/img/books.svg"
            />
          </div>
          <h6 className="text-md font-semibold uppercase">Nothing found</h6>
          <Link
            href="/courses"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Explor courses
          </Link>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center gap-x-4 justify-center h-[calc(100vh-600px)] max-w-4xl mx-auto">
          <div className="text-center">
            <Loader2Icon className="h-5 w-5 text-primary animate-spin" />
          </div>
          <div>
            <h6 className="text-sm">Loading</h6>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
        {!isError &&
          data?.courses &&
          data.courses.map((c, idx) => (
            <Card key={idx} className="overflow-hidden max-w-4xl">
              <CardHeader className="p-0 w-full">
                <div className="relative overflow-clip">
                  <div className="z-10 absolute right-2 top-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="bg-background/50 backdrop-blur-md p-2 rounded-full"
                        >
                          <EllipsisVertical className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto z-1">
                        <div className="space-y-2 flex flex-col items-start">
                          {status !== "Archived" && (
                            <Button
                              size="sm"
                              variant="link"
                              className="text-foreground/80"
                              onClick={() =>
                                handleStatusUpdate(c.enrolled.id, "Archived")
                              }
                            >
                              Move to Archive
                            </Button>
                          )}
                          {status !== "Completed" && (
                            <Button
                              size="sm"
                              variant="link"
                              className="text-foreground/80"
                              onClick={() =>
                                handleStatusUpdate(c.enrolled.id, "Completed")
                              }
                            >
                              Move to Completed
                            </Button>
                          )}
                          {status !== "Active" && (
                            <Button
                              size="sm"
                              variant="link"
                              className="text-foreground/80"
                              onClick={() =>
                                handleStatusUpdate(c.enrolled.id, "Active")
                              }
                            >
                              Move to Active Learning
                            </Button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Image
                    width={1000}
                    height={200}
                    alt={c.title}
                    src={c.thumbnail}
                    className="z-0 hover:scale-105 transition duration-300"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex items-center justify-between gap-2 p-2 px-2 py-4 text-muted-foreground scroll-m-20 text-md font-semibold tracking-tight">
                <div className="inline-flex items-center justify-start gap-2">
                  <Avatar>
                    <AvatarImage src={c.instructor.profileImage} />
                    <AvatarFallback>{c.instructor.firstName[0]}</AvatarFallback>
                  </Avatar>

                  <p className="text-sm font-semibold text-muted-foreground">
                    {`${c.instructor.firstName ?? ""} ${
                      c.instructor.lastName ?? ""
                    }`}
                  </p>
                </div>
                <div className="inline-flex items-center justify-end gap-2">
                  <Image
                    width={24}
                    height={24}
                    src={c.category.icon}
                    alt={c.category.title}
                  />
                  <p className="text-sm font-normal text-muted-foreground/70 whitespace-nowrap">
                    {c.category.title}
                  </p>
                </div>
              </CardContent>

              <CardContent className="px-4 flex flex-col justify-between min-h-[85px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <Link
                        href={`/student/learning/${c.id}`}
                        className="text-xl font-semibold tracking-tight text-foreground/80"
                      >
                        Learn how to {truncate(c.title, { length: 25 })}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{c.title}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
              <CardContent className="px-4">
                <div>
                  <Progress
                    varient="default"
                    value={c.progress}
                    className="my-2"
                  />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground/80">
                        {c.progress}% complete
                      </p>
                    </div>
                    <div>
                      <Ratings
                        variant="yellow"
                        rating={c.review ? c.review.rating : 0}
                      />
                      <p className="text-xs text-foreground/60">
                        {c.review ? "click to update review" : "leave a review"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* PAGINATION SECTION */}
      <div hidden={!data?.total} className="mt-5 mx-auto sticky bottom-0">
        <div
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * 12 + 1}</span>
              &nbsp; to&nbsp;
              <span className="font-medium">
                {(page - 1) * 12 +
                  (data && data.courses ? data?.courses.length : 0)}
              </span>{" "}
              of&nbsp;
              <span className="font-medium">{data?.total ?? 0}</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end gap-x-4">
            <Button variant="secondary" onClick={handlePageBack}>
              Previous
            </Button>
            <Button variant="secondary" onClick={handlePageNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveLearning;
