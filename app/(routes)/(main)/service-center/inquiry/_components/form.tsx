"use client";

import { Button } from "@/app/_components/Button";
import { Select } from "@/app/_components/Select";
import { TextArea, TextField } from "@/app/_components/Text";
import { useRef } from "react";

export default function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (formData: FormData) => {
    alert(
      `문의를 등록하였습니다.\n1:1문의에 대한 답변은 "마이페이지 > 1:1 문의내역"에서 확인하실 수 있습니다.`
      // ${(formData.values() as FormDataIterator<FormDataEntryValue>).toArray()}`
    );
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 mt-5 px-[100px] py-10"
      action={onSubmit}
    >
      <Select
        name="category"
        label="문의 유형 선택하기"
        placeholder="문의 유형을 선택하세요"
        required
        options={[
          { value: "1", text: "문의유형1" },
          { value: "2", text: "문의유형2" },
          { value: "3", text: "문의유형3" },
        ]}
      />
      <TextField
        id="title"
        label="제목"
        placeholder="제목을 입력하세요"
        required
      />
      <TextArea
        name="contents"
        label="내용 입력"
        placeholder="내용을 입력하세요"
        className="h-40"
        required
      />
      <div className="h-10" />
      <Button type="submit" color="primary" title="문의하기" />
    </form>
  );
}
