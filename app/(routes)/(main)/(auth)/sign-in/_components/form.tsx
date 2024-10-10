"use client";

import { Button } from "@/app/_components/Button";
import { CheckBox } from "@/app/_components/CheckBox";
import { Input } from "@/app/_components/Text";
import { signIn } from "@/app/_services/auth";
import {
  deleteRememberedUserEmail,
  getRememberedUserEmail,
  rememberUserEmail,
} from "@/app/_utils/localstorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import Cookies from "js-cookie";

export default function LoginForm() {
  const router = useRouter();
  const [initialEmail, setInitialEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("ccrm-token");
    if (token) {
      router.replace("/program");
    }

    setInitialEmail(getRememberedUserEmail());
  }, [router]);

  const handleSignIn = async (formData: FormData) => {
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const storeEmail = formData.get("store-email")?.toString() ?? "";

    if (storeEmail) {
      rememberUserEmail(email);
    } else if (initialEmail) {
      deleteRememberedUserEmail();
    }

    flushSync(() => setError(""));

    const { data, error } = await signIn(email, password);
    if (error) {
      setError(
        (error.response?.data as { message: string }).message || error.message
      );
    }
    if (data) {
      window.location.href = "/program";
    }
  };

  return (
    <form className="w-full" action={handleSignIn}>
      <Input
        type="email"
        name="email"
        placeholder="이메일 아이디"
        className="w-full mt-2"
        defaultValue={initialEmail}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        className="w-full mt-2"
        required
      />
      {error && <p className="text-xs text-sub-4 mt-2">{error}</p>}
      <Button
        type="submit"
        className="w-full mt-4 shadow-grayscale-10 shadow-md"
        color="primary"
        title="로그인"
      />
      <div className="flex flex-col self-start mt-4 gap-2">
        <CheckBox
          name={"store-email"}
          label="아이디 저장"
          defaultChecked={initialEmail !== ""}
        />
        {/* <CheckBox name={"store-pw"} label="비밀번호 저장" /> */}
      </div>
    </form>
  );
}
