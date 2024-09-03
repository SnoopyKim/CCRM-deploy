"use client";

import { Button } from "@/app/_components/Button";
import { CheckBox } from "@/app/_components/CheckBox";
import { Input } from "@/app/_components/Text";
import { useRef } from "react";

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const storeId = formData.get("store-id");
    const storePw = formData.get("store-pw");

    alert(
      `로그인
      이메일: ${email}
      비밀번호: ${password}
      아이디 저장: ${storeId}
      비밀번호 저장 ${storePw}`
    );
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} className="w-full" action={onSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="이메일 아이디"
        className="w-full mt-16"
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        className="w-full mt-2"
        required
      />
      <Button
        className="w-full mt-4 shadow-grayscale-10 shadow-md"
        color="primary"
      >
        로그인
      </Button>
      <div className="flex flex-col self-start mt-4 gap-2">
        <CheckBox name={"store-id"} label="아이디 저장" />
        <CheckBox name={"store-pw"} label="비밀번호 저장" />
      </div>
    </form>
  );
}
