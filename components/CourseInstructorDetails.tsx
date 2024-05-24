import {
  StarIcon,
  AwardIcon,
  PlayCircleIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { CourseDetailsInstructor } from "@/typings/user";

interface CourseInstructorDetailsProps {
  instructor: CourseDetailsInstructor;
}

const CourseInstructorDetails: FunctionComponent<
  CourseInstructorDetailsProps
> = ({ instructor }) => {
  return (
    <div className="space-y-2 border rounded p-10 bg-muted">
      <h3 className="mb-2 text-2xl font-semibold">About Instructor</h3>
      <Link
        href={`/user/${instructor.username}`}
        className="text-lg font-semibold text-primary"
      >
        {`${instructor.firstName ?? ""} ${instructor.lastName ?? ""}`}
      </Link>
      <div className="flex items-center gap-x-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={instructor.profileImage} />
          <AvatarFallback>{instructor.username[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm text-foreground/70">
            <StarIcon className="h-5 w-5" /> {instructor.rating}
            &nbsp; Instructor rating
          </p>
          <p className="flex items-center gap-2 text-sm text-foreground/70">
            <AwardIcon className="h-5 w-5" /> {instructor.reviews}
            &nbsp; Reviews
          </p>
          <p className="flex items-center gap-2 text-sm text-foreground/70">
            <UsersRoundIcon className="h-5 w-5" />
            {instructor.enrollments}
            &nbsp; Students
          </p>
          <p className="flex items-center gap-2 text-sm text-foreground/70">
            <PlayCircleIcon className="h-5 w-5" />
            {instructor.courses}
            &nbsp; Courses
          </p>
        </div>
      </div>
      <p>{instructor.bio}</p>
    </div>
  );
};

export default CourseInstructorDetails;
