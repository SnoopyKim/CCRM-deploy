"use client";

import { useState } from "react";
import { Input, TextField } from "@/app/_components/Text";
import { Button } from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import RegisterModel from "@/app/_models/register";
import { signUp } from "@/app/_services/auth";
import Cookies from "js-cookie";

export default function SignUpFormPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: {
    terms: string;
    privacy: string;
  };
}) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const register = new RegisterModel(
      formData.get("email")?.toString() ?? "",
      formData.get("email")?.toString() ?? "",
      formData.get("password")?.toString() ?? "",
      formData.get("name")?.toString() ?? "",
      formData.get("phone")?.toString() ?? "",
      formData.get("company")?.toString(),
      formData.get("branch")?.toString(),
      formData.get("position")?.toString(),
      formData.get("region")?.toString()
    );
    const { data, error } = await signUp(register);
    if (error) {
      console.log(error.message);
    }
    if (data) {
      Cookies.set("ccrm-token", data.jwtToken, {
        expires: 30,
      });
      Cookies.remove("ccrm-temp-token");

      window.location.href = "/program";
    }
  };

  const checkEmailDuplication = () => {
    // TODO: 이메일 중복 확인
  };

  const verifyPhone = () => {
    // TODO: 현재 전화번호 확인
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-10 w-[400px] m-auto mt-12"
    >
      <h1 className="text-2xl">회원가입 정보 입력</h1>
      <div className="flex flex-row gap-2">
        <TextField
          type="email"
          name="email"
          title="아이디 설정"
          placeholder="이메일 아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <Button
          title="중복 확인"
          color="primary"
          onClick={checkEmailDuplication}
          className="mt-7"
        />
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          type="password"
          name="password"
          title="비밀번호 설정"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password-confirm"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          type="text"
          name="name"
          title="필수 개인정보 입력"
          placeholder="이름"
          required
        />
        <div className="flex flex-row gap-2">
          <Input
            type="tel"
            name="phone"
            placeholder="휴대폰번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button title="인증 받기" color="primary" onClick={verifyPhone} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <TextField
          type="text"
          name="company"
          title="선택 개인정보 입력"
          placeholder="회사명"
        />
        <Input type="text" name="branch" placeholder="지점" />
        <Input type="text" name="position" placeholder="직책" />

        <Input type="text" name="region" placeholder="지역" />
      </div>

      <Button
        type="submit"
        title="회원가입하기"
        className="mt-10 shadow-md shadow-grayscale-9"
        disabled
      />
    </form>
  );
}
