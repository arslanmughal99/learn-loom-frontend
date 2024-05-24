import Image from "next/image";
import { NextPage } from "next";
import { Inter } from "next/font/google";
import { CheckCircle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";


import {
  Carousel,
  CarouselNext,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { classNames } from "@/utils/class-names";
import CourseCard from "@/components/CourseCard";
import { Category, Course } from "@/typings/course";
import { Card, CardContent } from "@/components/ui/card";

const inter = Inter({ subsets: ["latin"] });

const featuredTestimonial = {
  body: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
  author: {
    name: "Brenna Goyette",
    handle: "brennagoyette",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
  },
};
const testimonials = [
  [
    [
      {
        body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
        author: {
          name: "Leslie Alexander",
          handle: "lesliealexander",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
        author: {
          name: "Lindsay Walton",
          handle: "lindsaywalton",
          imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
        author: {
          name: "Tom Cook",
          handle: "tomcook",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.",
        author: {
          name: "Leonard Krasner",
          handle: "leonardkrasner",
          imageUrl:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
];

interface HomePageProps {
  categories: Category[];
  popularCourses: Course[];
}

const HomePage: NextPage<HomePageProps> = ({ categories, popularCourses }) => {
  return (
    <main className={classNames(inter, "max-w-7xl mx-auto px-5 md:px-0")}>
      {/* HERO SECTION */}
      <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col flex-1 space-y-5 text-center md:text-left">
          <p className="text-md text-primary">100% Satisfaction Guarantee</p>
          {/* <GenerateText words="Joy Of Learning & Teaching" /> */}
          <h1 className="text-6xl font-bold opacity-80 text">
            Joy Of Learning & Teaching
          </h1>
          <p className="text-md">
            U2E is a fully-featured educational platform that helps instructors
            to create and publish video courses, live classes, and text courses
            and earn money, and helps students to learn in the easiest way.
          </p>
          <div className="gap-3 flex justify-center md:justify-start">
            <div>
              <Button>Get Courses Now</Button>
            </div>
            <div>
              <Button variant="outline">Become Instructor</Button>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <p className="text-sm md:text-md inline-flex items-center">
              <CheckCircle className="md:h-5 md:w-5 w-3 h-3 text-primary" />{" "}
              &nbsp; Experience Mentor
            </p>
            <p className="text-sm md:text-md inline-flex items-center">
              <CheckCircle className="md:h-5 md:w-5 w-3 h-3 text-primary" />{" "}
              &nbsp; Video Quality
            </p>
            <p className="text-sm md:text-md inline-flex items-center">
              <CheckCircle className="md:h-5 md:w-5 w-3 h-3 text-primary" />{" "}
              &nbsp; Affordable Price
            </p>
          </div>
        </div>
        <div className="inline-flex items-center justify-end flex-1 overflow-hidden">
          <Image
            width={1000}
            height={1000}
            alt="Hero image 1"
            className="h-auto w-[30rem]"
            src="/img/young_boy.png"
          />
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="mt-20 space-y-5">
        <h3 className="text-center text-4xl font-semibold opacity-80">
          Explore Courses by Category
        </h3>
        <p className="text-center text-md opacity-60">
          Exploring a course is both exciting and intimidating. It allows you to
          expand your knowledge, learn new skills, and discover new interests.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {categories.map((c, idx) => (
            <Card key={idx} className="w-full pt-6 z-0">
              <CardContent className="flex flex-col items-center">
                <div>
                  <Image alt={c.title} width={50} height={50} src={c.icon} />
                </div>
                <div>
                  <h6 className="text-lg opacity-80">{c.title}</h6>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* MOST POPULAR COURSE */}
      <div className="mt-20 space-y-5">
        <h3 className="text-center text-4xl font-semibold opacity-80">
          Most Popular Courses
        </h3>
        <p className="text-center text-md opacity-60">
          Sint ipsum sunt sunt officia voluptate enim qui esse mollit
          reprehenderit duis incididunt voluptate enim qui esse mollit
          reprehenderit duis incididunt
        </p>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full mt-12"
          opts={{ align: "start", loop: true }}
        >
          <CarouselPrevious className="hidden md:flex" />
          <CarouselContent className="p-1">
            {popularCourses.map((pc, idx) => (
              <CarouselItem
                key={idx}
                className="lg:basis-1/4 md:basis-1/3 basis-full"
              >
                <CourseCard course={pc} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* WHY LEARNING ONLINE SECTION */}
      <div className="mt-20 flex flex-col gap-10 md:flex-row items-center justify-between">
        <div>
          <Image
            width={2000}
            height={1000}
            alt="Hero image 1"
            className="h-auto w-[50rem]"
            src="/img/young_girl.png"
          />
        </div>
        <div>
          <div className="space-y-4 flex flex-col items-center text-center md:text-start md:items-start justify-start">
            <h3 className="text-4xl font-semibold opacity-80">
              Why Online Learning Method ?
            </h3>
            <p className="text-md opacity-60">
              Exploring a course is both exciting and intimidating. It allows
              you to expand your knowledge, learn new skills, and discover new
              interests learn new skills, and discover new interests.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-5 mt-20">
            <div className="inline-flex items-center gap-5">
              <Image
                width={50}
                height={50}
                alt="Certified"
                src="/img/certified_icon.svg"
                className="h-12 w-12 md:h-18 md:w-18"
              />
              <h6 className="text-sm md:text-lg font-bold text-foreground/80">
                Certified
              </h6>
            </div>
            <div className="inline-flex items-center gap-5">
              <Image
                width={50}
                height={50}
                alt="Certified"
                src="/img/fixabletime_icon.svg"
                className="h-12 w-12 md:h-18 md:w-18"
              />
              <h6 className="text-sm md:text-lg font-bold text-foreground/80">
                Fixable Time
              </h6>
            </div>
            <div className="inline-flex items-center gap-5">
              <Image
                width={50}
                height={50}
                alt="Certified"
                src="/img/access_anywhere_icon.svg"
                className="h-12 w-12 md:h-18 md:w-18"
              />
              <h6 className="text-sm md:text-lg font-bold text-foreground/80">
                Access Anywhere
              </h6>
            </div>
            <div className="inline-flex items-center gap-5">
              <Image
                width={50}
                height={50}
                alt="Certified"
                src="/img/247_support_icon.svg"
                className="h-12 w-12 md:h-18 md:w-18"
              />
              <h6 className="text-sm md:text-lg font-bold text-foreground/80">
                24*7 Online Support
              </h6>
            </div>
          </div>
          <div className="mt-20 text-center md:text-start">
            <Button size="lg">Learn More</Button>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="mt-10">
        <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
          <div
            className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
            aria-hidden="true"
          >
            <div
              className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-primary"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div
            className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
            aria-hidden="true"
          >
            <div
              className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-primary xl:ml-0 xl:mr-[calc(50%-12rem)]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">
                Testimonials
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                We have worked with thousands of amazing people
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
              <figure className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1">
                <blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900">
                  <p>{`“${featuredTestimonial.body}”`}</p>
                </blockquote>
                <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src={featuredTestimonial.author.imageUrl}
                    className="h-10 w-10 flex-none rounded-full bg-gray-50"
                  />
                  <div className="flex-auto">
                    <div className="font-semibold">
                      {featuredTestimonial.author.name}
                    </div>
                    <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                  </div>
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    className="h-10 w-auto flex-none"
                    src={featuredTestimonial.author.logoUrl}
                  />
                </figcaption>
              </figure>
              {testimonials.map((columnGroup, columnGroupIdx) => (
                <div
                  key={columnGroupIdx}
                  className="space-y-8 xl:contents xl:space-y-0"
                >
                  {columnGroup.map((column, columnIdx) => (
                    <div
                      key={columnIdx}
                      className={classNames(
                        (columnGroupIdx === 0 && columnIdx === 0) ||
                          (columnGroupIdx === testimonials.length - 1 &&
                            columnIdx === columnGroup.length - 1)
                          ? "xl:row-span-2"
                          : "xl:row-start-1",
                        "space-y-8"
                      )}
                    >
                      {column.map((testimonial) => (
                        <figure
                          key={testimonial.author.handle}
                          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                        >
                          <blockquote className="text-gray-900">
                            <p>{`“${testimonial.body}”`}</p>
                          </blockquote>
                          <figcaption className="mt-6 flex items-center gap-x-4">
                            <img
                              className="h-10 w-10 rounded-full bg-gray-50"
                              src={testimonial.author.imageUrl}
                              alt=""
                            />
                            <div>
                              <div className="font-semibold">
                                {testimonial.author.name}
                              </div>
                              <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                            </div>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OUR PARTNERS SECTION */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <h3 className="text-4xl font-semibold opacity-80 text-center">
          Our Partners
        </h3>
        <div className="mt-10 mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-400.svg"
            alt="Transistor"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-400.svg"
            alt="Reform"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-400.svg"
            alt="Tuple"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-400.svg"
            alt="SavvyCal"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-400.svg"
            alt="Statamic"
            width={158}
            height={48}
          />
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="mt-20 rounded-lg bg-primary py-16 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
            <h2 className="inline sm:block lg:inline xl:block">
              Want product news and updates?
            </h2>{" "}
            <p className="inline sm:block lg:inline xl:block">
              Sign up for our newsletter.
            </p>
          </div>
          <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
            <div className="flex items-center gap-x-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-primary-foreground/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset outline-none focus:ring-background/90 sm:text-sm sm:leading-6"
              />
              <Button variant="secondary" className="text-primary">
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              We care about your data. Read our
              <a
                href="#"
                className="font-semibold text-white hover:text-indigo-50"
              >
                privacy&nbsp;policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

export async function getStaticProps() {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [categoriesRes, popularCoursesRes] = await Promise.all([
    fetch(endpoint + "/course/categories"),
    fetch(endpoint + "/course/popular"),
  ]);

  const { categories } = await categoriesRes.json();
  const { courses } = await popularCoursesRes.json();

  return {
    props: { categories, popularCourses: courses },
    revalidate: 60,
  };
}
