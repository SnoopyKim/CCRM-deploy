"use client";

import useAuthStore from "@/app/_utils/auth/store";
import { useEffect, useState } from "react";

function AuthHydration({ children }: { children: React.ReactNode }) {
  const hasInitialized = useAuthStore((state) => state.hasInitialized);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (hasInitialized) {
      setIsHydrated(true);
    }
  }, [hasInitialized]);

  if (!isHydrated) {
    return <></>; // Zustand 스토어가 복원되는 동안 표시할 로딩 UI
  }

  return children;
}

export default AuthHydration;
