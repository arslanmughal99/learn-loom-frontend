import {
  PenLineIcon,
  BookOpenIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useParams } from "next/navigation";

import { cn } from "@/utils/utils";
import MyLearning from "./MyLearning";
import Certificates from "./Certificates";
import ActiveAssignments from "./ActiveAssignments";

interface DashboardLayoutProps {}

const navigation = [
  // {
  //   name: "Dashboard",
  //   icon: LayoutDashboardIcon,
  //   href: "/student/dashboard",
  // },
  {
    icon: BookOpenIcon,
    name: "My Learning",
    href: "/student/dashboard/learning",
  },
  {
    name: "Assignments",
    href: "/student/dashboard/assignments",
    icon: PenLineIcon,
  },
  {
    name: "Certificates",
    href: "/student/dashboard/achivements",
    icon: GraduationCapIcon,
  },
];

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = () => {
  const params = useParams();
  const activeNav =
    params && params.slug && params.slug.length > 0
      ? params.slug[0]
      : "dashboard";

  return (
    <div className="flex gap-x-10 justify-center">
      {/* SIDEBAR NAVIGATION */}
      <div className="mt-14 mb-16 w-[250px] border rounded-md p-4 h-[calc(65vh)]">
        <ul role="list" className="flex flex-col">
          <li>
            <ul role="list" className="divide-y">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      item.href.endsWith(activeNav)
                        ? "bg-gray-50 text-primary"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                    )}
                  >
                    <item.icon
                      className={cn(
                        item.href.endsWith(activeNav)
                          ? "text-primary"
                          : "text-gray-400 group-hover:text-primary",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      {/* MIDDLE CONTENT */}
      <div className="max-w-7xl w-[1280px] py-12">
        {activeNav === "learning" && <MyLearning />}
        {activeNav === "achivements" && <Certificates />}
        {activeNav === "assignments" && <ActiveAssignments />}
      </div>
    </div>
  );
};

export default DashboardLayout;
