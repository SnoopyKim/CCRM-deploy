"use client";
import { ProgramEducationVideo } from "@/app/_types/model";
import Image from "next/image";
import { useState } from "react";

export default function VideoGridView({
  videos,
}: {
  videos: ProgramEducationVideo[];
}) {
  // 모든 비디오에서 카테고리 추출 및 중복 제거
  const categories = [
    "전체",
    ...Array.from(new Set(videos.map((video) => video.category))),
  ];
  const [activeCategory, setActiveCategory] = useState("전체");

  // 선택된 카테고리에 따라 비디오 필터링
  const filteredVideos =
    activeCategory === "전체"
      ? videos
      : videos.filter((video) => video.category === activeCategory);

  return (
    <div>
      {/* 카테고리 버튼들 */}
      <div className="flex space-x-2 mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full border ${
              category === activeCategory
                ? "bg-sub-6 border-2 border-sub-7 text-sub-7"
                : "border-grayscale-8 text-grayscale-1 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 필터링된 비디오 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {filteredVideos.map((video, index) => (
          <div
            key={index}
            className="h-50 items-center justify-center"
          >
            <div className="relative w-full h-28">
              <Image
                objectFit="cover"
                src={video.thumbnailUrl}
                fill
                alt={video.title}
              />
            </div>
            {/* <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-60 h-40 object-cover"
            /> */}
            <div className="mt-2 mb-2">
              <div className="flex">
                <h2 className="text-xl font-bold">{index + 1}</h2>
                <h3 className="ml-2 content-center"> {video.title}</h3>
              </div>
              <p className="mt-1 text-main-1 text-xs">
                {video.category} | {video.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
