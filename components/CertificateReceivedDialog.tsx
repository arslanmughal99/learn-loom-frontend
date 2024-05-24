import Confetti from "react-confetti";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { certificateReceivedDialogState } from "../state/certificate";
import { Button, buttonVariants } from "./ui/button";
import { GraduationCapIcon, XIcon } from "lucide-react";
import Link from "next/link";

interface CertificateReceivedDialogProps {}

const CertificateReceivedDialog: FunctionComponent<
  CertificateReceivedDialogProps
> = () => {
  const [running, setRunning] = useState(true);
  const [open, setOpen] = useRecoilState(certificateReceivedDialogState);

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 10000);
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" onClose={close} className="relative z-10">
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed top-4 z-40">
            <Confetti recycle={running} />
          </div>
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
                  onClick={close}
                  variant="ghost"
                  className="absolute right-5 top-5 z-10 hover:text-background text-background/80 hover:bg-primary/30 bg-foreground/10 px-2"
                >
                  <XIcon className="h-6 w-6" />
                </Button>

                <div className="p-10 flex flex-col items-center justify-center">
                  <div>
                    <GraduationCapIcon className="h-28 w-28 text-primary" />
                  </div>
                  <div>
                    <h6 className="text-xl text-secondary-foreground">
                      Congratulations
                    </h6>
                  </div>
                  <div>
                    <p className="text-secondary-foreground font-sm">
                      You have received new certificate
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/student/certificates"
                      className={buttonVariants({ variant: "link" })}
                    >
                      Go to certificates
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CertificateReceivedDialog;
