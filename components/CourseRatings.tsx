import { round } from "lodash";
import { StarIcon } from "lucide-react";
import { FunctionComponent } from "react";

import { Ratings } from "@/components/ui/ratings";
import { Progress } from "@/components/ui/progress";
import { CourseDetailsRating } from "@/typings/course";

interface CourseReviewsProps {
  rating: CourseDetailsRating;
}

const CourseRatings: FunctionComponent<CourseReviewsProps> = ({ rating }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold text-left">Course Reviews</h3>
      <div className="flex items-center gap-x-2">
        <Ratings rating={rating.average} variant="yellow" />
        <p className="flex items-center gap-x-2 text-md text-foreground/80 text-justify">
          based on {rating.total} student reviews
        </p>
      </div>
      {/* FIVE STAR */}
      <div className="flex items-center gap-x-4 justify-between">
        <p className="flex items-center text-md text-foreground/80 gap-x-2">
          5&nbsp;
          <StarIcon className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
        </p>
        <Progress
          placeholder="sd"
          className="w-[80%] h-3"
          value={round((rating.fivestar / rating.total) * 100, 1)}
        />
        <p className="flex items-center text-sm text-foreground/80 w-[70px]">
          {round((rating.fivestar / rating.total) * 100, 1)}%
        </p>
      </div>
      {/* FOUR STAR */}
      <div className="flex items-center gap-x-4 justify-between">
        <p className="flex items-center text-md text-foreground/80 gap-x-2">
          4&nbsp;
          <StarIcon className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
        </p>
        <Progress
          placeholder="sd"
          className="w-[80%] h-3"
          value={round((rating.fourstar / rating.total) * 100, 1)}
        />
        <p className="flex items-center text-sm text-foreground/80 w-[70px]">
          {round((rating.fourstar / rating.total) * 100, 1)}%
        </p>
      </div>
      {/* THREE STAR */}
      <div className="flex items-center gap-x-4 justify-between">
        <p className="flex items-center text-md text-foreground/80 gap-x-2">
          3&nbsp;
          <StarIcon className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
        </p>
        <Progress
          placeholder="sd"
          className="w-[80%] h-3"
          value={round((rating.threestar / rating.total) * 100, 1)}
        />
        <p className="flex items-center text-sm text-foreground/80 w-[70px]">
          {round((rating.threestar / rating.total) * 100, 1)}%
        </p>
      </div>
      {/* TWO STAR */}
      <div className="flex items-center gap-x-4 justify-between">
        <p className="flex items-center text-md text-foreground/80 gap-x-2">
          2&nbsp;
          <StarIcon className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
        </p>
        <Progress
          className="w-[80%] h-3"
          value={round((rating.twostar / rating.total) * 100, 1)}
        />
        <p className="flex items-center text-sm text-foreground/80 w-[70px]">
          {round((rating.twostar / rating.total) * 100, 1)}%
        </p>
      </div>
      {/* ONE STAR */}
      <div className="flex items-center gap-x-4 justify-between">
        <p className="flex items-center text-md text-foreground/80 gap-x-2">
          1&nbsp;
          <StarIcon className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
        </p>
        <Progress
          className="w-[80%] h-3"
          value={round((rating.onestar / rating.total) * 100, 1)}
        />
        <p className="flex items-center text-sm text-foreground/80 w-[70px]">
          {round((rating.onestar / rating.total) * 100, 1)}%
        </p>
      </div>
    </div>
  );
};

export default CourseRatings;
