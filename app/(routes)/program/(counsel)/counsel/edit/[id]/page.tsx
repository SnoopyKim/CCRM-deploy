"use client";

import ColorButton from "@/app/(routes)/program/customer/_components/color-button";
import PrimaryButton from "@/app/_components/Button/button";
import Icon from "@/app/_components/Icon";
import { Select, SelectField } from "@/app/_components/Select";
import { Input, TextArea, TextField } from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";
import useDialogStore from "@/app/_utils/dialog/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

const prevCounsels = [
  {
    id: 1,
    status: "조회상담",
    date: "2024.00.00",
  },
  {
    id: 2,
    status: "상품제안",
    date: "2024.00.00",
  },
];

export default function CounselEditPage() {
  const router = useRouter();
  const openPostcodePopup = useDaumPostcodePopup();
  const openAlert = useDialogStore((state) => state.openAlert);

  const [mainAddress, setMainAddress] = useState<string>("");

  const addCounsel = async () => {
    await openAlert({
      title: "상담 수정 완료",
      description: "상담 현황 페이지로 이동합니다",
    });
    router.push("/program/counsel-list");
  };

  const handlePostcodeComplete = (data: Address) => {
    let fullAddress = data.address; // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setMainAddress(fullAddress);
  };

  return (
    <div className="flex flex-col max-w-screen-lg w-full p-6 space-y-8 mx-auto">
      <h1 className="text-3xl text-normal">상세보기 및 수정</h1>
      <div className="flex gap-4 flex-grow">
        <div className="flex flex-col gap-4 w-1/3 ">
          <h2 className="text-xl font-normal">이전 상담 내용</h2>
          <div className="flex-1 border border-grayscale-11 px-6 py-4 space-y-4">
            {prevCounsels.map((counsel) => (
              <div key={counsel.id} className="flex gap-2 items-center">
                <div className="flex gap-2 rounded-full px-2 py-1 bg-grayscale-12 items-center">
                  <span className="bg-sub-1 rounded-full w-4 h-4"></span>
                  <span className="text-sub-1 font-normal">
                    {counsel.status}
                  </span>
                </div>
                <span className="text-grayscale-6">-</span>
                <span className="text-grayscale-6">{counsel.date}</span>
                <Link
                  href={`/program/counsel/edit/${counsel.id}`}
                  className="p-1 rounded hover:bg-grayscale-12"
                >
                  <Icon type={"create"} className="w-5 h-5 fill-sub-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-2/3">
          <h2 className="text-xl font-normal">고객정보 / 상담내용</h2>
          <div className="flex flex-col flex-1 px-6 py-4 gap-4 bg-grayscale-13">
            <div>
              <TextLabel title="고객명" />
              <p className="mt-2 text-xl font-semibold">김철수</p>
            </div>
            <div>
              <TextLabel title="연락처" />
              <div className="flex gap-2 justify-between items-center mt-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  name="mb_phone1"
                  placeholder="010"
                  maxLength={4}
                  required
                />
                <span>-</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  name="mb_phone2"
                  placeholder=""
                  maxLength={4}
                  required
                />
                <span>-</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  name="mb_phone3"
                  placeholder=""
                  maxLength={4}
                  required
                />
              </div>
            </div>
            <SelectField
              title="상담 내용"
              placeholder="선택해주세요"
              options={[
                { value: 0, text: "아이디 저장" },
                { value: 1, text: "정보 수집" },
                { value: 2, text: "상품 제안" },
                { value: 3, text: "계약 체결" },
                { value: 4, text: "증권 전달" },
                { value: 5, text: "기타" },
              ]}
            />
            <TextArea
              label="자세한 상담내용"
              placeholder="자세한 상담내용 입력"
              className="h-32"
            />
            <div className="flex gap-4">
              <ColorButton
                color="sub-2"
                icon="aiVerbal"
                title="대화 음성녹음"
              />
              <ColorButton color="sub-2" icon="aiFile" title="텍스트 변환" />
              <ColorButton color="sub-2" icon="ai" title="AI 요약" />
            </div>
            <TextField title="상담 일" type="date" />
            <div>
              <TextLabel title="상담 시간" />
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <Select
                    options={[
                      { value: "am", text: "오전" },
                      { value: "pm", text: "오후" },
                    ]}
                    className="h-12 py-2"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    options={Array.from({ length: 12 }, (_, i) => ({
                      value: i + 1,
                      text: `${i + 1}시`,
                    }))}
                    className="h-12 py-2"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    options={Array.from({ length: 60 }, (_, i) => ({
                      value: i,
                      text: `${i}분`,
                    }))}
                    className="h-12 py-2"
                  />
                </div>
              </div>
            </div>
            <div>
              <TextField
                title="상담 장소"
                name="mb_addr1"
                placeholder="주소 검색"
                value={mainAddress}
                readOnly
                onClick={() =>
                  openPostcodePopup({ onComplete: handlePostcodeComplete })
                }
              />
              <Input
                type="text"
                name="mb_addr2"
                placeholder="나머지 주소 입력"
                required
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <PrimaryButton
          color="gray"
          title="뒤로"
          className="w-40"
          onClick={() => router.back()}
        />
        <PrimaryButton
          color="secondary"
          title="저장"
          className="w-40"
          onClick={addCounsel}
        />
      </div>
    </div>
  );
}
