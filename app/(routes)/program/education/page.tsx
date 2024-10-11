import { ProgramEducationVideo } from "@/app/_types/model";
import Categories from "./category";
import VideoGridView from "./category";

export default function EducationPage() {
  const exampleData1 = {
    title: "부동산 공매 투자로 10억 만들기",
    category: "재테크 · 투자",
    author: "김강희",
    thumbnailUrl:
      "https://i0.wp.com/dictionaryblog.cambridge.org/wp-content/uploads/2024/08/As-clear-as-mud-e1723817611391.jpg?resize=768%2C620&ssl=1",
    videoUrl: "https://",
  };
  const exampleData2 = {
    title: "투자하고 싶은 보험 설계하기",
    category: "보험 설계",
    author: "박유현",
    thumbnailUrl:
      "https://i0.wp.com/dictionaryblog.cambridge.org/wp-content/uploads/2024/08/As-clear-as-mud-e1723817611391.jpg?resize=768%2C620&ssl=1",
    videoUrl: "https://",
  };
  const videoList: ProgramEducationVideo[] = [
    exampleData1,
    exampleData2,
    exampleData1,
    exampleData2,
    exampleData1,
    exampleData2,
    exampleData1,
    exampleData2,
  ];

  return (
    <div className="w-full justify-start space-y-8">
      {/* 제목 */}
      <h1 className="text-2xl font-semibold text-main-1">실시간 인기 클래스</h1>
      <VideoGridView videos={videoList} />
    </div>
  );
}
