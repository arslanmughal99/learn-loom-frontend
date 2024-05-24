/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { FunctionComponent, useState } from "react";

import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { useGetActiveAssignments } from "@/hooks/assignments";

interface ActiveAssignmentsProps {}

const ActiveAssignments: FunctionComponent<ActiveAssignmentsProps> = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState();
  const { data } = useGetActiveAssignments({
    size: 12,
    page,
    status,
  });

  const handlePageBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageNext = () => {
    const total = data?.total || 0;
    const maxPage = Math.floor(total / 12);
    if (page <= maxPage) setPage(page + 1);
  };

  return (
    <div className="p-2 overflow-y-auto">
      <div className="flex items-center gap-x-1">
        {/* ASSIGNMENT LIST */}
        <div className="w-full h-[65vh]">
          <ul
            role="list"
            className="divide-y divide-gray-100 border rounded-md h-full overflow-y-auto"
          >
            {data?.assignments.map((a, idx) => (
              <li key={idx} className="relative py-5 hover:bg-gray-50">
                <div className="mx-auto flex max-w-7xl justify-between gap-x-6 px-4 sm:px-6 lg:px-8">
                  <div className="flex gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={a.assignment.lecture.thumbnail}
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <a href="">
                          <span className="absolute inset-x-0 -top-px bottom-0" />
                          {a.assignment.title}
                        </a>
                      </p>
                      <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <a
                          // href={`mailto:${person.email}`}
                          className="relative truncate hover:underline"
                        >
                          <Link
                            href={`/student/learning/${a.assignment.lecture.course.id}`}
                          >
                            related course: {a.assignment.lecture.course.title}
                          </Link>
                        </a>
                      </p>
                      <p className="mt-1 flex text-xs leading-5 text-gray-500">
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <div>
                        <p className="text-sm leading-6 text-gray-900">
                          {a.assignment.lecture.title}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                          <svg
                            className={cn(
                              "h-1.5 w-1.5",
                              a.status === "Incomplete" && "fill-rose-500",
                              a.status === "Passed" && "fill-green-500",
                              a.status === "Submited" && "fill-orange-500",
                              a.status === "Failed" && "fill-red-500"
                            )}
                            viewBox="0 0 6 6"
                            aria-hidden="true"
                          >
                            <circle cx={3} cy={3} r={3} />
                          </svg>
                          {a.status}
                        </span>
                      </div>
                      {/* {person.lastSeen ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Last seen{" "}
                          <time dateTime={person.lastSeenDateTime}>
                            {person.lastSeen}
                          </time>
                        </p>
                      ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-xs leading-5 text-gray-500">
                            Online
                          </p>
                        </div>
                      )} */}
                    </div>
                    <ChevronRightIcon
                      className="h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PAGINATION SECTION */}
      <div hidden={!data?.total} className="mt-5 mx-auto sticky bottom-0">
        <div
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing {(page - 1) * 12 + 1} to{" "}
              {(page - 1) * 12 +
                (data && data.assignments ? data!.assignments.length : 0)}{" "}
              of {data?.total ?? 0} results
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
    </div>
  );
};

export default ActiveAssignments;
