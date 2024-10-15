/* eslint-disable @next/next/no-img-element */
"use client";
import CourseModel, { CourseCategory } from "@/app/_models/course";
import Link from "next/link";

const imageLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function CourseGridView({
  courses,
  category,
}: {
  courses: CourseModel[];
  category: string;
}) {
  // 선택된 카테고리에 따라 비디오 필터링
  const filteredCourses =
    category === "all"
      ? courses
      : courses.filter((video) => video.category === category);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {filteredCourses.map((video, index) => (
        <Link
          key={index}
          href={video.url}
          target="_blank"
          className="hover:opacity-80 hover:bg-grayscale-12 cursor-pointer"
        >
          <div className="relative h-32 2xl:h-40">
            <img
              className="w-full h-full object-cover"
              src={
                video.attachment ??
                "https://i.ytimg.com/vi/pJzXsBJ5Hx4/hq720.jpg"
              }
              alt={video.attachment}
            />
          </div>
          <div className="my-2">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">{index + 1}</h2>
              <p className="ml-4 text overflow-hidden text-ellipsis whitespace-nowrap">
                {video.title}
              </p>
            </div>
            <p className="mt-1 text-main-1 text-xs">
              {CourseCategory[video.category] ?? "기타"} | {video.lecturer}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
