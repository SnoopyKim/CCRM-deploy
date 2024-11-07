"use client";

import { Button } from "@/app/_components/Button";
import { SelectField } from "@/app/_components/Select";
import { TextArea, TextField } from "@/app/_components/Text";
import { useRef } from "react";
import { apiRequest } from "@/app/_utils/axios/client";
import useDialogStore from "@/app/_utils/dialog/store";
import useAuthStore from "@/app/_utils/auth/store";

export default function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { openAlert } = useDialogStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const onSubmit = async (formData: FormData) => {
    const { data, error } = await apiRequest(
      "/customer-support/one-on-one-inquiry",
      {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (error) {
      openAlert({
        title: "문의 발송 실패",
        description: error.message || "알 수 없는 오류",
      });
    }

    if (data) {
      openAlert({
        title: "문의 발송 성공",
        description: "신속히 답변 드릴 수 있도록 하겠습니다!",
      });
      formRef.current?.reset();
    }
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 mt-10 px-[100px] max-lg:px-4"
      action={onSubmit}
    >
      <SelectField
        name="category"
        title="문의 유형 선택하기"
        placeholder="문의 유형을 선택하세요"
        required
        options={[
          { value: "결제 문의", text: "결제 문의" },
          { value: "프로그램 문의", text: "프로그램 문의" },
          { value: "제휴 문의", text: "제휴 문의" },
          { value: "기타 문의", text: "기타 문의" },
        ]}
      />
      <TextField
        id="inquiryTitle"
        title="제목"
        placeholder="제목을 입력하세요"
        required
      />
      <TextArea
        name="inquiryContent"
        title="내용 입력"
        placeholder="내용을 입력하세요"
        className="h-40"
        required
      />
      <div className="h-10" />
      {isAuthenticated ? (
        <Button type="submit" color="primary" title="문의하기" />
      ) : (
        <Button title="로그인 후 문의가 가능합니다" disabled />
      )}
    </form>
  );
}
