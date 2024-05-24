import { clone } from "lodash";
import { CheckIcon } from "lucide-react";
import { FunctionComponent } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface CourseObjectivesProps {
  objectives: string[];
}

const CourseObjectives: FunctionComponent<CourseObjectivesProps> = ({
  objectives,
}) => {
  return (
    <Collapsible asChild defaultOpen={false}>
      <div className="border-2 rounded-sm p-8">
        <h3 className="py-2 text-2xl font-semibold">What you&apos;ll learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {clone(objectives).splice(0, 6).map((o, idx) => (
            <p
              key={idx}
              className="inline-flex items-start gap-2 text-md text-foreground/80"
            >
              <span>
                <CheckIcon className="h-5 w-5" />
              </span>
              {o}
            </p>
          ))}
        </div>
        {clone(objectives).length >= 6 && (
          <>
            <CollapsibleContent
              asChild
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {objectives.splice(6, objectives.length).map((o, idx) => (
                <p
                  key={idx}
                  className="inline-flex items-start gap-2 text-md text-foreground/80"
                >
                  <span>
                    <CheckIcon className="h-5 w-5" />
                  </span>
                  {o}
                </p>
              ))}
            </CollapsibleContent>
          </>
        )}
        {objectives.length >= 6 && (
          <CollapsibleTrigger asChild className="py-2 text-primary underline">
            Show More
          </CollapsibleTrigger>
        )}
      </div>
    </Collapsible>
  );
};

export default CourseObjectives;
