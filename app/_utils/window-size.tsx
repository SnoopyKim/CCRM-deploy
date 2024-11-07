import React, { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.screen.width : 0,
    height: typeof window !== "undefined" ? window.screen.height : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.screen.width,
        height: window.screen.height,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 사이즈 설정

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
