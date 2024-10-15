"use client";

import { useEffect, useState } from "react";
import CourseGridView from "./course-grid";
import CourseModel, { CourseCategory } from "@/app/_models/course";
import { getCourses } from "@/app/_services/course";
import useDialogStore from "@/app/_utils/dialog/store";

export default function EducationPage() {
  const [courseList, setCourseList] = useState<CourseModel[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const { openAlert } = useDialogStore();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getCourses(1, 100);
      if (error) {
        openAlert({
          title: "인기 클래스 가져오기 오류",
          description: error.message,
        });
        return;
      }
      setCourseList(data?.data ?? []);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-6 pb-4">
      {/* 제목 */}
      <h1 className="text-2xl font-semibold text-main-1">실시간 인기 클래스</h1>
      <div className="flex space-x-2">
        {Object.entries({ all: "전체", ...CourseCategory }).map(
          (category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category[0])}
              className={`px-4 py-2 rounded-full border ${
                category[0] === activeCategory
                  ? "bg-sub-6 border-2 border-sub-7 text-sub-7"
                  : "border-grayscale-8 text-grayscale-1 hover:bg-gray-100"
              }`}
            >
              {category[1]}
            </button>
          )
        )}
      </div>
      <CourseGridView category={activeCategory} courses={courseList} />
    </div>
  );
}
