import { FunctionComponent, useState } from "react";

import { cn } from "../../../utils/utils";
import EnrollmentsGrid from "./EnrollmentsGrid";
import { useGetEnrollmentsStats } from "../../../hooks/enrollment";

interface MyLearningProps {}

const tabs = [
  { href: "active", name: "Active Learning" },
  { href: "archived", name: "Archived" },
  { href: "completed", name: "Completed" },
];

const MyLearning: FunctionComponent<MyLearningProps> = () => {
  const [current, setCurrent] = useState<string>("active");
  const { data: stats, refetch: refetchStats } = useGetEnrollmentsStats();

  return (
    <>
      <div>
        <div className="border-b border-gray-200">
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
                    "flex whitespace-nowrap border-b-2 py-4 text-sm font-medium rounded-none"
                  )}
                >
                  {t.name}
                  {stats && (stats as any)[t.href] ? (
                    <span
                      className={cn(
                        current === t.href
                          ? "bg-primary/10 text-primary"
                          : "bg-none text-foreground/50",
                        "ml-3 rounded-full py-0.5 px-2.5 text-xs font-medium inline-block"
                      )}
                    >
                      {(stats as any)[t.href]}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto h-[calc(100vh-500px)] overflow-y-auto">
        <div className="hidden lg:block z-10 sticky backdrop-blur-xs top-0 left-0 h-12 bg-gradient-to-b from-background to-transparent" />
        <div className="px-4 lg:px-0">
          {current === "active" && (
            <EnrollmentsGrid refetchStats={refetchStats} status="Active" />
          )}
          {current === "archived" && (
            <EnrollmentsGrid refetchStats={refetchStats} status="Archived" />
          )}
          {current === "completed" && (
            <EnrollmentsGrid refetchStats={refetchStats} status="Completed" />
          )}
        </div>
        {/* <div className="hidden lg:block z-10 sticky backdrop-blur-xs bottom-0 left-0 h-12 bg-gradient-to-t from-background/80 to-transparent" /> */}
      </div>
    </>
  );
};

export default MyLearning;
