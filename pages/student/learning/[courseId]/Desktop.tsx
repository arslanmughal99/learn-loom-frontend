import dayjs from "dayjs";
import Video from "next-video";
import Image from "next/image";
import { toast } from "sonner";
import { NextPage } from "next";
import { getCookie } from "cookies-next";
import { capitalize, reduce } from "lodash";
import { useMemo, useRef, useState } from "react";
import { LockIcon, MonitorPlayIcon, PlayIcon, StarIcon } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/utils/utils";
import { Lecture } from "@/typings/lecture";
import { Button } from "@/components/ui/button";
import { useGetCookieKeys } from "@/hooks/auth";
import { CourseDetails } from "@/typings/course";
import { useCourseProgress } from "@/hooks/course";
import { Separator } from "@/components/ui/separator";
import CourseRatings from "@/components/CourseRatings";
import CourseObjectives from "@/components/CourseObjectives";
import CourseReviewsDialog from "@/components/CourseReviewsDialog";
import CourseInstructorDetails from "@/components/CourseInstructorDetails";

interface CourseClassDesktopProps {
  course: CourseDetails;
}

const tabs = [
  { href: "overview", name: "Overview" },
  { href: "instructor", name: "Instructor" },
  { href: "faq", name: "FAQs" },
  { href: "ratings", name: "Ratings" },
];
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
let progressTriggerLock = false;

const CourseClassDesktop: NextPage<CourseClassDesktopProps> = ({ course }) => {
  const ref = useRef<HTMLVideoElement>();
  const { session: sKey } = useGetCookieKeys();
  const [openReviews, setOpenReviews] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [current, setCurrent] = useState<string>("overview");
  const progressTrackEndpoint = `${endpoint}/lecture/progress`;
  const [currentLecture, setCurrentLecture] = useState<Lecture | undefined>();
  const { data: courseProgress, refetch: refetchCourseProgress } =
    useCourseProgress({ courseId: course.id });

  const handleLectureProgressChange = async () => {
    const session = getCookie(sKey);

    const newTimeStamp = ref.current!.currentTime;
    if (newTimeStamp >= currentLecture!.duration) return;

    const oldProgress = courseProgress?.progress.find(
      (p) => p.id === currentLecture?.id
    );
    const oldTimeStamp = oldProgress?.progress
      ? (oldProgress.progress / 100) * currentLecture!.duration
      : 0;

    const progressDiff = newTimeStamp - oldTimeStamp;

    if (progressDiff >= 10) {
      if (!progressTriggerLock) {
        progressTriggerLock = true;
      } else {
        return;
      }
      try {
        const r = await fetch(progressTrackEndpoint, {
          method: "POST",
          body: JSON.stringify({
            duration:
              newTimeStamp <= currentLecture!.duration - 10
                ? currentLecture?.duration
                : Math.ceil(newTimeStamp),
            lectureId: currentLecture?.id,
          }),
          headers: {
            Authorization: `Bearer ${session}`,
            "Content-Type": "application/json",
          },
        });
        const resp = await r.json();
        console.log(resp);
        await refetchCourseProgress();
      } catch (err) {
        console.log(err);
      } finally {
        progressTriggerLock = false;
      }
    }
  };

  const handleLoadLecture = async (l: Lecture) => {
    setLoadingVideo(true);
    const session = getCookie(sKey);
    const url = endpoint + "/lecture/video/" + l.id;
    try {
      const rawRes = await fetch(url, {
        headers: { Authorization: `Bearer ${session}` },
      });
      const res = await rawRes.json();
      if (rawRes.status === 200 && res.video) {
        l.video = res.video;
        setCurrentLecture(l);
        return;
      }

      toast.warning(res.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingVideo(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-screen overflow-hidden">
        {/* HEADER */}
        <div className="px-8 h-20 bg-background shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div>
              <Image
                width={500}
                height={500}
                alt="LearnLoom"
                src="/img/logo.png"
                className="w-auto h-[50px]"
              />
            </div>
            <div>
              <Separator
                className="h-8 bg-foreground/20"
                orientation="vertical"
              />
            </div>
            <div>
              <h3 className="text-foreground/80 font-semibold">
                {capitalize(course.title)}
              </h3>
            </div>
          </div>
          <div>
            <Button className="gap-x-2" size="sm">
              <StarIcon className="h-5 w-5" /> Write Review
            </Button>
          </div>
        </div>
        {/* MAIN CONTENT SECTION */}
        <div className="flex justify-between h-[calc(100vh-50px)]">
          {/* VIDEO SCROLL AREA SECTION */}
          <div className="w-full overflow-y-auto overflow-x-hidden">
            <div>
              {currentLecture?.video ? (
                <Video
                  ref={ref}
                  autoPlay
                  accentColor="#F97316"
                  src={currentLecture?.video}
                  blurDataURL={currentLecture.thumbnail}
                  onTimeUpdate={handleLectureProgressChange}
                />
              ) : (
                <div className="bg-secondary-foreground/90 flex items-center justify-center gap-x-2 h-[calc(100vh-100px)]">
                  <div>
                    <PlayIcon className="h-5 w-5 text-white/80" />
                  </div>
                  <div>
                    <h6 className="text-white/80">
                      Select lecture from course content.
                    </h6>
                  </div>
                </div>
              )}
            </div>

            {/* OVERVIEW TABS SECTION */}
            <div className="px-6 pb-6">
              <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex items-center justify-center md:justify-start space-x-4 md:space-x-8">
                  {tabs.map((t, idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrent(t.href)}
                        className={cn(
                          current === t.href
                            ? "border-primary text-primary"
                            : "border-transparent text-foreground/50 hover:border-foreground/10 hover:text-foreground/70",
                          "flex whitespace-nowrap border-b-2 py-4 text-md font-semibold rounded-none"
                        )}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div
                className={cn(
                  current !== "overview" && "hidden",
                  "max-w-7xl space-y-10"
                )}
              >
                <CourseObjectives objectives={course.objectives} />
                <div className="space-y-2">
                  <h4 className="font-semibold text-3xl">About this course</h4>
                  <p className="text-lg text-justify">{course.description}</p>
                </div>
              </div>

              <div className={cn(current !== "instructor" && "hidden")}>
                <div className="max-w-3xl">
                  <CourseInstructorDetails instructor={course.instructor} />
                </div>
              </div>

              <div className={cn(current !== "ratings" && "hidden", "mb-2")}>
                <div className="max-w-3xl space-y-4">
                  <CourseRatings rating={course.rating} />
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => setOpenReviews(true)}
                  >
                    Show Reviews
                  </Button>
                </div>
              </div>

              <div className={cn(current !== "faq" && "hidden", "mb-2")}>
                <div className="max-w-7xl space-y-4">
                  <Accordion
                    type="multiple"
                    className="rounded border-2 w-full md:w-auto"
                  >
                    {course.faqs.map((faq, idx) => (
                      <AccordionItem value={faq.title} key={idx}>
                        <AccordionTrigger className="bg-muted px-5">
                          <div className="flex items-center justify-between w-full md:mr-2">
                            <h6 className="text-lg font-semibold text-foreground">
                              {faq.title}
                            </h6>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent key={idx} className="px-5">
                          <h6 className="text-lg text-foreground">
                            {faq.answer}
                          </h6>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
          {/* SIDE CONTENT SCROLL AREA */}
          <div className="xl:w-[600px] lg:w-[400px] md:w-full overflow-y-auto">
            <div className="p-2">
              <h3 className="text-lg font-semibold">Course Content</h3>
            </div>
            <nav className="h-full overflow-y-auto" aria-label="Directory">
              {course.groups.map((g, idx) => (
                <div key={idx} className="relative">
                  <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                    <div>
                      <h6 className="text-lg font-semibold text-foreground">
                        {idx + 1} {g.title}
                      </h6>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">
                        {g.lectures.length} lectures . &nbsp;
                        {reduce<Lecture, number>(
                          g.lectures,
                          (p, c) => (p += c.duration),
                          0
                        ) / 60}
                        mins
                      </p>
                    </div>
                  </div>
                  <ul role="list" className="divide-y divide-gray-100 px-4">
                    {g.lectures.map((l, iidx) => {
                      const progress = courseProgress?.progress.find(
                        (p) => p.id === l.id
                      );

                      return (
                        <li key={iidx}>
                          <div className="flex items-center justify-between h-full">
                            <div className="py-2 w-[70%]">
                              <Button
                                variant="link"
                                onClick={() => handleLoadLecture(l)}
                                className={cn(
                                  "text-foreground/80 -ml-4 inline-flex items-center gap-2",
                                  l.id === currentLecture?.id && "text-primary"
                                )}
                              >
                                {idx + 1}.{iidx + 1} - {l.title}
                              </Button>
                              <div className="flex items-center justify-between gap-x-2">
                                <div className="flex items-center gap-x-2">
                                  <MonitorPlayIcon className="h-5 w-5 opacity-50" />
                                  <p className="text-sm text-foreground/50">
                                    {dayjs(l.duration * 1000)
                                      .format("mm:ss")
                                      .toString()}
                                  </p>
                                  <p className="text-sm text-primary">
                                    {progress &&
                                      progress.progress &&
                                      `${Math.ceil(
                                        (progress.progress / l.duration) * 100
                                      )}% watched`}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-end h-14">
                              {progress?.locked && !progress.completed && (
                                <div className="flex items-center gap-x-1">
                                  <LockIcon className="h-4 w-4 text-primary/80" />
                                  <p className="text-xs text-secondary-foreground/80">
                                    Locked
                                  </p>
                                </div>
                              )}
                              {progress && progress.completed && (
                                <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                                  <svg
                                    viewBox="0 0 6 6"
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 fill-green-500"
                                  >
                                    <circle cx={3} cy={3} r={3} />
                                  </svg>
                                  Completed
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <CourseReviewsDialog
        open={openReviews}
        courseId={course.id}
        rating={course.rating}
        close={() => setOpenReviews(false)}
      />
    </>
  );
};

export default CourseClassDesktop;
