import CourseModel, { CourseCategory } from "@/app/_models/course";
import Link from "next/link";

export default function CourseItem({
  number,
  video,
}: {
  number: number;
  video: CourseModel;
}) {
  return (
    <Link
      href={video.url}
      target="_blank"
      className="hover:opacity-80 hover:bg-grayscale-12 cursor-pointer"
    >
      <div className="relative h-32 2xl:h-40">
        <img
          className="w-full h-full object-cover"
          src={
            video.attachment ?? "https://i.ytimg.com/vi/pJzXsBJ5Hx4/hq720.jpg"
          }
          alt={video.attachment}
        />
      </div>
      <div className="my-2">
        <div className="w-full flex items-center">
          <h2 className="text-2xl font-bold">{number}</h2>
          <p className="ml-4 text overflow-hidden text-ellipsis whitespace-nowrap">
            {video.title}
          </p>
        </div>
        <p className="mt-1 text-main-1 text-xs">
          {CourseCategory[video.category] ?? "기타"} | {video.lecturer}
        </p>
      </div>
    </Link>
  );
}
