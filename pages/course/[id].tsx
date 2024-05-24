/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { clone } from "lodash";
import { useRecoilState } from "recoil";
import { FunctionComponent, useState } from "react";

import CourseRatings from "../../components/CourseRatings";
import { Button } from "@/components/ui/button";
import { CourseDetails } from "@/typings/course";
import { Ratings } from "@/components/ui/ratings";
import CourseDetailCard from "../../components/CourseDetailCard";
import CourseContent from "@/components/CourseContent";
import CourseReviewsDialog from "../../components/CourseReviewsDialog";
import { courseContentDialogState } from "@/state/course";
import CourseObjectives from "@/components/CourseObjectives";
import CoursePreviewDialog from "@/components/CoursePreviewDialog";
import CourseInstructorDetails from "@/components/CourseInstructorDetails";

interface CoursePageProps {
  details: CourseDetails;
}

const CoursePage: FunctionComponent<CoursePageProps> = ({ details }) => {
  const [openReviews, setOpenReviews] = useState(false);
  const [openPreview, setOpenPreview] = useRecoilState(
    courseContentDialogState
  );

  return (
    <>
      {/* LECTURE HERO SECTION */}
      <div className="bg-primary/10">
        <div className="flex md:flex-row flex-col items-center ejustify-between max-w-7xl mx-auto px-8 lg:px-5 py-10">
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2">
              <Image
                width={30}
                height={30}
                src={details.category.icon}
                alt={details.category.title}
                className="ring-2 ring-primary/20 rounded ring-offset-1"
              />
              <Link
                className="text-muted-foreground"
                href={`/instructor/${details.instructor.username}`}
              >
                {details.category.title}
              </Link>
            </div>
            <h3 className="text-3xl font-bold opacity-80 text">
              Learn how to {details.title}
            </h3>
            <div className="flex items-center gap-2">
              <Ratings variant="yellow" rating={details.rating.average} />
              <p className="text-primary">({details.rating.total} review)</p>
              <p className="text-foreground/60">{details.students} enrolled</p>
            </div>
            <div className="inline-flex items-center gap-2">
              <p className="text-muted-foreground">Created by</p>
              <Link
                className="text-primary underline"
                href={`/instructor/${details.instructor.username}`}
              >
                {`${details.instructor.firstName ?? ""} ${
                  details.instructor.lastName ?? ""
                }`}
              </Link>
              <p className="text-muted-foreground">
                {dayjs(details.createdAt).format("DD/MM/YYYY").toString()}
              </p>
            </div>
          </div>
          <div className="hidden md:block basis-1/3" />
        </div>
      </div>
      {/* MOBILE COURSE CARD  */}
      <div className="block md:hidden px-3 -mt-5">
        <CourseDetailCard details={details} />
      </div>
      <div className="px-3 lg:px-5 relative mt-10 max-w-7xl mx-auto flex md:flex-row flex-col items-start ejustify-between">
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-8">
          {/* WHAT YOU WILL LEARN SECTION */}
          <div>
            <CourseObjectives objectives={clone(details.objectives)} />
          </div>
          {/* COURSE CONTENT SECTION */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Course Content</h3>
            <CourseContent details={details} />
          </div>
          {/* REQUIREMENTS SECTION */}
          <div>
            <h3 className="text-2xl font-semibold">Requirements</h3>
            <ul className="list-disc list-inside space-y-2">
              {details.requirements.map((r, idx) => (
                <li key={idx} className="text-sm">
                  {r.requirement} {!r.required && "(optional)"}
                </li>
              ))}
            </ul>
          </div>
          {/* DESCRIPTION SECTION */}
          <div>
            <h3 className="text-2xl font-semibold">Description</h3>
            <p className="text-md text-foreground/80 text-justify">
              {details.description}
            </p>
          </div>

          <div>
            <CourseRatings rating={details.rating} />
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setOpenReviews(true)}
            >
              Show Reviews
            </Button>
          </div>

          {/* MOBILE INSTRUCTOR DETAILS */}
          <div className="block md:hidden">
            <CourseInstructorDetails instructor={details.instructor} />
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className="hidden md:block basis-2/6 pl-12 space-y-8">
          {/* COURSE DETAIL CARD SECTION */}
          <div className="-mt-[190px]">
            <CourseDetailCard details={details} />
          </div>

          {/* INSTRUCTOR DETAILS SECTION */}
          <CourseInstructorDetails instructor={details.instructor} />
        </div>
      </div>
      <CoursePreviewDialog
        details={details}
        open={openPreview}
        close={() => setOpenPreview(false)}
      />
      <CourseReviewsDialog
        open={openReviews}
        courseId={details.id}
        rating={details.rating}
        close={() => setOpenReviews(false)}
      />
    </>
  );
};

export async function getStaticProps(cx: any) {
  try {
    const courseId = cx.params.id;
    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const url = endpoint + "/course/" + courseId;
    const rawRes = await fetch(url);
    const details = await rawRes.json();
    if (!details.id) return { notFound: true };

    return {
      props: { details },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const url = endpoint + "/course/all";
  const rawRes = await fetch(url);
  const res: { id: number }[] = await rawRes.json();

  const paths = res.map((r) => ({ params: { id: r.id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default CoursePage;
