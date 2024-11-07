/* eslint-disable @next/next/no-img-element */
"use client";
import CourseModel, { CourseCategory } from "@/app/_models/course";
import Link from "next/link";
import CourseItem from "./course-item";

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredCourses.map((video, index) => (
        <CourseItem key={index} number={index + 1} video={video} />
      ))}
    </div>
  );
}
