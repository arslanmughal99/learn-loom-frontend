import Video from "next-video";
import { XIcon } from "lucide-react";
import { useRecoilState } from "recoil";
import { Fragment, FunctionComponent } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Button } from "./ui/button";
import CourseContent from "./CourseContent";
import { CourseDetails } from "@/typings/course";
import { coursePreviewCurrentLecture } from "@/state/course";

interface CoursePreviewDialogProps {
  open: boolean;
  close: () => void;
  details: CourseDetails;
}

const CoursePreviewDialog: FunctionComponent<CoursePreviewDialogProps> = ({
  open,
  close,
  details,
}) => {
  const [current, _setCurrent] = useRecoilState(coursePreviewCurrentLecture);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          close();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-background/80 backdrop-blur-md bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              leave="ease-in duration-200"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="mt-20 md:mt-0 relative w-full rounded border md:max-w-2xl overflow-hidden lg:max-w-4xl bg-background">
                <Button
                  onClick={() => {
                    close();
                  }}
                  variant="ghost"
                  className="absolute right-5 top-5 z-10 hover:text-background text-background/80 hover:bg-primary/30 bg-foreground/10 px-2"
                >
                  <XIcon className="h-6 w-6" />
                </Button>
                <Video accentColor="#F97316" autoPlay src={current?.video} />
                <div className="p-3 md:max-h-[calc(100vh-800px)]  overflow-y-auto">
                  <CourseContent details={details} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CoursePreviewDialog;
