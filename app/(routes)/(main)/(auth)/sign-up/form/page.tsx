"use client";

import { FormEventHandler, useState } from "react";
import Link from "next/link";
import { Input, TextField } from "@/app/_components/Text";
import { CheckBox } from "@/app/_components/CheckBox";
import { Button, LinkButton } from "@/app/_components/Button";
import { useRouter } from "next/navigation";

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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [branch, setBranch] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = (formData: FormData) => {
    // TODO: 회원가입 로직
    // alert(
    //   (formData.values() as FormDataIterator<FormDataEntryValue>).toArray()
    // );
    router.replace("/program");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Input
          type="text"
          name="branch"
          placeholder="지점"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <Input
          type="text"
          name="position"
          placeholder="직책"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Input
          type="text"
          name="area"
          placeholder="지역"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
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
