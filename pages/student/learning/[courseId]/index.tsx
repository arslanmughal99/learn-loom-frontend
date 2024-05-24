import { getCookie } from "cookies-next";
import { GetServerSidePropsContext, NextPage } from "next";

import CourseClassDesktop from "./Desktop";
import { CourseDetails } from "@/typings/course";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface CourseClassProps {
  course: CourseDetails;
}

const CourseClass: NextPage<CourseClassProps> = ({ course }) => {
  return (
    <>
      <CourseClassDesktop course={course} />
    </>
  );
};

export async function getServerSideProps(cx: GetServerSidePropsContext) {
  const session = getCookie(process.env.NEXT_PUBLIC_ACCESS_COOKIE_KEY!, {
    req: cx.req,
  });

  if (!session) {
    return {
      redirect: "/login?error=Session expired.",
    };
  }

  if (!cx.params || !cx.params.courseId) {
    return {
      redirect: "/student/learning",
    };
  }

  const courseId = cx.params.courseId! as string;
  const url = endpoint + "/course/enrolled/" + courseId;
  const resRaw = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
  const res = await resRaw.json();

  return {
    props: { course: res },
  };
}

export default CourseClass;
