import {
  XIcon,
  FilterIcon,
  SearchIcon,
  PhoneCallIcon,
  LoaderCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { useDebounce } from "@uidotdev/usehooks";
import { FunctionComponent, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import { Category, Course } from "@/typings/course";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetPublicCourses } from "@/hooks/course";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CoursesPageProps {
  searchParams: any;
  bestSelling: Course[];
  categories: Category[];
  popularCourses: Course[];
}

type CourseSearchForm = {
  size: number;
  page: number;
  search: string;
  cateogryId?: number;
};

const CoursesPage: FunctionComponent<CoursesPageProps> = ({
  categories,
  bestSelling,
  popularCourses,
}) => {
  const [search, setSearch] = useState("");
  const debounceState = useDebounce(search, 500);
  const [categoryId, setCategoryId] = useState<number>();
  const { data: courses, isFetching } = useGetPublicCourses({
    page: 1,
    size: 100,
    categoryId,
    search: debounceState,
  });

  return (
    <>
      {/* HEADER SECTION */}
      <div>
        <div className="h-[300px] bg-no-repeat bg-cover bg-[url('/img/courses_header_bg.svg')]" />
        <div className="space-y-2 -mt-[310px] md:-mt-[280px] mb-20 bg-transparent max-w-3xl mx-auto px-5 md:px-0 py-10 flex flex-col items-center">
          <h3 className="text-4xl font-bold opacity-80 text">Courses</h3>
          <p className="text-md text-center text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s Ipsum has been the industry standard dummy text ever
            since the 1500s
          </p>
          <div className="mt-2 flex rounded-md shadow-sm w-full">
            <div className="relative flex flex-grow items-stretch focus-within:z-10 ">
              <Input
                name="search"
                placeholder="Graphics Design"
                onChange={(e) => setSearch(e.currentTarget.value)}
                className="h-12 w-full focus:border-primary ring-0 ring-inset ring-transparent rounded-none rounded-l-md bg-backgroun text-lg placeholder:text-muted-foreground/50"
              />
            </div>
            <Button
              type="submit"
              className="h-12 relative -ml-px gap-x-1.5 rounded-r-md rounded-l-none text-sm "
            >
              {isFetching ? (
                <LoaderCircleIcon className="animate-spin h-5 w-5" />
              ) : (
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              )}
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* COURSES SECTION */}
      <div className="max-w-7xl mx-auto px-4 lg:px-2 xl:p-0">
        {/* COURSE FILTER SECTION */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between">
          {categoryId && (
            <Button
              variant="link"
              className="inline-flex items-center gap-2"
              onClick={() => setCategoryId(undefined)}
            >
              <XIcon className="h-5 w-5" />
              Clear
            </Button>
          )}
          <ScrollArea className="w-full md:w-[80%] py-5">
            <div className="flex w-max space-x-5">
              {categories.map((cat, idx) => (
                <Button
                  key={idx}
                  onClick={() => setCategoryId(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2",
                    categoryId === cat.id && "bg-primary/50 text-foreground"
                  )}
                  variant={categoryId === cat.id ? "default" : "ghost"}
                >
                  <Image alt="" width={30} height={30} src={cat.icon} />
                  {cat.title}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="w-full md:w-[10%]">
            <Popover>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full gap-2"
                >
                  <FilterIcon className="h-4 w-4" /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <h4 className="font-semibold text-2xl text-foreground/80">
                    Filter Search
                  </h4>
                  <div>
                    <ol>
                      <li className="inline-flex items-center gap-2">
                        <Checkbox />
                        Popular Courses
                      </li>
                      <li className="inline-flex items-center gap-2">
                        <Checkbox /> Best Instructor
                      </li>
                    </ol>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {/* SEARCH COURSES SECTION */}
        {courses && courses?.total > 0 && (
          <>
            <div className="mb-5">
              <h3 className="text-2xl font-semibold text-foreground/80">
                Search Results
              </h3>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
              {courses?.courses?.map((c, idx) => (
                <CourseCard key={idx} course={c} />
              ))}
            </div>
          </>
        )}

        {/* POPULAR COURSES SECTION */}
        <div className="my-5">
          <h3 className="text-2xl font-semibold text-foreground/80">
            Popular Courses
          </h3>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
          {popularCourses?.map((c, idx) => (
            <CourseCard key={idx} course={c} />
          ))}
        </div>

        {/* BEST SELLING COURSES SECTION */}
        <div className="my-5">
          <h3 className="text-2xl font-semibold text-foreground/80">
            Best Selling
          </h3>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
          {bestSelling?.map((c, idx) => (
            <CourseCard key={idx} course={c} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between bg-primary/20 rounded-md p-12">
          <div>
            <h3 className="text-2xl font-semibold text-foreground/80">
              For any kind of course related inquires
            </h3>
            <p className="text-sm text-muted-foreground">
              Available 24*7 for your support
            </p>
          </div>
          <div>
            <Button size="lg" className="gap-2">
              <PhoneCallIcon className="h-5 w-5" />
              123-456-4554
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [categoriesRes, popularCoursesRes, bestSellingRes] = await Promise.all([
    fetch(endpoint + "/course/categories"),
    fetch(endpoint + "/course/popular"),
    fetch(endpoint + "/course/best-selling"),
  ]);

  const { categories } = await categoriesRes.json();
  const { courses } = await popularCoursesRes.json();
  const { courses: bestSelling } = await bestSellingRes.json();

  return {
    props: { categories, popularCourses: courses, bestSelling },
    revalidate: 60,
  };
}

export default CoursesPage;
