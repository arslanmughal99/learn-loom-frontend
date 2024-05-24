/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import Link from "next/link";
import { Share2Icon, TrophyIcon, ViewIcon } from "lucide-react";
import { FunctionComponent, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useGetCertificates } from "@/hooks/certificates";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "../../../utils/utils";
import { CertificateBadge } from "../../../components/CertificateBadge";

interface CertificatesProps {}

const Certificates: FunctionComponent<CertificatesProps> = () => {
  const [page, setPage] = useState(1);
  const { data, isError } = useGetCertificates({ page, size: 12 });

  const handlePageBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageNext = () => {
    const total = data?.total || 0;
    const maxPage = Math.floor(total / 12);
    if (page <= maxPage) setPage(page + 1);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 h-[calc(100vh-500px)] overflow-y-auto">
        {!isError &&
          data?.certificates &&
          data.certificates.map((c, idx) => (
            <Card
              key={idx}
              className="h-[450px] overflow-hidden max-w-4xl rounded-xl border-[3px] shadow-sm"
            >
              <CardHeader className="relative p-0 w-full">
                <img src={c.course.thumbnail} alt={c.course.title} />

                <div className="absolute left-3 top-2 h-20 w-20">
                  <CertificateBadge />
                </div>
              </CardHeader>

              <CardContent className="p-2 px-2 pt-4 text-muted-foreground text-md font-semibold h-full">
                <div className="h-[135px] flex flex-col">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-secondary-foreground">
                      Certificate for{" "}
                      <Link
                        className="text-primary"
                        href={`/student/learning/${c.course.id}`}
                      >
                        {c.course.title}
                      </Link>
                    </h4>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Issued at{" "}
                        {dayjs(c.createdAt).format("DD/MM/YYYY").toString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Link
                        target="_blank"
                        href={`/certificate/${c.id}`}
                        className={cn(
                          "gap-x-2",
                          buttonVariants({ size: "sm", variant: "secondary" })
                        )}
                      >
                        <Share2Icon className="h-4 w-4" /> Share
                      </Link>
                      <Link
                        target="_blank"
                        href={`/certificate/${c.id}`}
                        className={cn(
                          "gap-x-2",
                          buttonVariants({ size: "sm", variant: "default" })
                        )}
                      >
                        <ViewIcon className="h-4 w-4" />
                        View
                      </Link>
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
              Showing {(page - 1) * 12 + 1} to{" "}
              {(page - 1) * 12 +
                (data && data.certificates
                  ? data?.certificates.length
                  : 0)}{" "}
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
    </>
  );
};

export default Certificates;
