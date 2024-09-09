"use client";

import { Input, TextField } from "@/app/_components/Text";
import PageTitle from "../_components/page-title";
import TextLabel from "@/app/_components/Text/label";
import { Button } from "@/app/_components/Button";
import { useEffect, useRef, useState } from "react";
import Captcha, {
  loadCaptcha,
  validateCaptcha,
} from "@/app/_components/Captcha";

export default function ChangePasswordPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [error, setError] = useState({
    current: "",
    confirm: "",
    captcha: "",
  });

  const onChangePassword = (formData: FormData) => {
    const newPassword = formData.get("new-password");
    const newPasswordConfirm = formData.get("new-password-confirm");

    if (newPasswordConfirm && newPassword !== newPasswordConfirm) {
      setError((error) => ({
        ...error,
        confirm: "비밀번호가 일치하지 않습니다",
      }));
      return;
    }

    const captcha = (formData.get("captcha") ?? "").toString();
    if (!validateCaptcha(captcha, { reload: false })) {
      setError((error) => ({ ...error, captcha: "문자가 일치하지 않습니다" }));
      return;
    }

    // TODO: API Call
    alert("변경되었습니다!");
    if (formRef.current) formRef.current.reset();
    loadCaptcha();
  };

  return (
    <>
      <PageTitle>비밀번호 변경</PageTitle>
      <form
        ref={formRef}
        action={onChangePassword}
        className="flex flex-col items-stretch px-20 py-10 gap-4"
      >
        <Input type="password" placeholder="현재 비밀번호 입력" required />
        <TextField
          id="new-password"
          type="password"
          title="새로운 비밀번호 설정"
          placeholder="새 비밀번호"
          onInput={(e) => {
            if (error.confirm) {
              setError((error) => ({
                ...error,
                confirm: "",
              }));
            }
          }}
          required
        />
        <Input
          id="new-password-confirm"
          type="password"
          placeholder="새 비밀번호 확인"
          onInput={(e) => {
            if (error.confirm) {
              setError((error) => ({
                ...error,
                confirm: "",
              }));
            }
          }}
          error={error.confirm}
          required
        />
        <div className="flex flex-col gap-2">
          <TextLabel title="아래 이미지를 보이는대로 입력하십시오." />
          <Captcha />
          <Input
            id="captcha"
            placeholder="자동입력 방지 문자"
            onInput={(e) => {
              if (error.captcha) {
                setError((error) => ({
                  ...error,
                  captcha: "",
                }));
              }
            }}
            error={error.captcha}
            required
          />
        </div>
        <Button type="submit" title="수정하기" />
      </form>
    </>
  );
}
