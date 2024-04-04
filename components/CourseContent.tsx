import dayjs from "dayjs";
import { reduce } from "lodash";
import { useRecoilState } from "recoil";
import { FunctionComponent } from "react";
import { FileVideoIcon, LockKeyholeIcon } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  courseContentDialogState,
  coursePreviewCurrentLecture,
} from "../state/course";
import { CourseDetails, PreviewLecture } from "../typings/course";
import { cn } from "../utils/utils";

interface CourseContentProps {
  details: CourseDetails;
}

const CourseContent: FunctionComponent<CourseContentProps> = ({ details }) => {
  const [current, setCurrent] = useRecoilState(coursePreviewCurrentLecture);
  const [openPreview, setOpenPreview] = useRecoilState(
    courseContentDialogState
  );

  return (
    <Accordion type="multiple" className="rounded border-2 w-full md:w-auto">
      {details.groups.map((g, idx) => (
        <AccordionItem value={g.title} key={idx}>
          <AccordionTrigger className="bg-muted px-5">
            <div className="flex items-center justify-between w-full md:mr-2">
              <div>
                <h6 className="text-lg font-semibold text-foreground">
                  {g.title}
                </h6>
              </div>
              <div>
                <p className="text-sm text-foreground/60">
                  {g.lectures.length} lectures . &nbsp;
                  {reduce<PreviewLecture, number>(
                    g.lectures,
                    (p, c) => (p += c.duration),
                    0
                  ) / 60}
                  mins
                </p>
              </div>
            </div>
          </AccordionTrigger>
          {g.lectures.map((l, idx) => (
            <AccordionContent key={idx} className="px-5">
              <div className="w-full inline-flex items-center justify-between">
                <Button
                  variant="link"
                  className={cn(
                    "text-foreground/80 -ml-5 inline-flex items-center gap-2",
                    l.id === current?.id && openPreview && "text-primary"
                  )}
                >
                  <FileVideoIcon className="h-5 w-5" />
                  {l.title}
                </Button>
                <div className="flex items-center gap-x-2">
                  {l.preview ? (
                    <Button
                      variant="link"
                      onClick={() => {
                        setCurrent(l);
                        setOpenPreview(true);
                      }}
                    >
                      Preview
                    </Button>
                  ) : (
                    <p className="text-muted-foreground inline-flex items-center gap-y-4">
                      <LockKeyholeIcon className="h-4 w-4" />
                      Enroll to watch
                    </p>
                  )}
                  <p className="text-sm text-foreground/50">
                    {dayjs(l.duration * 1000)
                      .format("mm:ss")
                      .toString()}
                  </p>
                </div>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseContent;
