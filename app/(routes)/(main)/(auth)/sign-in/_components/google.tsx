"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
export default function GoogleAuthButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const callGoogleApi = async () => {
    const queryParams = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/google/callback`,
      response_type: "code",
      scope:
        "openid email profile https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/calendar",
      access_type: "offline",
      prompt: "consent",
    };

    router.push(
      `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
        queryParams
      ).toString()}`
    );
  };

  return (
    <div
      className="w-full h-14 flex justify-center items-center shadow-inner-1 shadow-grayscale-10 rounded-sm bg-grayscale-14 hover:bg-grayscale-13"
      onClick={callGoogleApi}
    >
      <Image
        src="/images/google.png"
        alt="sign-in-with-google"
        width={20}
        height={20}
      />
      <span className="ml-2 font-medium">{children}</span>
    </div>
  );
}
