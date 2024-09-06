"use client";

import { useEffect } from "react";

let captcha_value = "";
let backgroundColor_value = "";
let fontColor_value = "";
// let charMap_value = "";
export const loadCaptcha = (
  numberOfCharacters: number = 6,
  backgroundColor = "white",
  fontColor = "black"
  // charMap = ""
) => {
  backgroundColor_value = backgroundColor;
  fontColor_value = fontColor;
  // charMap_value = charMap;
  let retVal = "";
  let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // if (charMap === "upper") {
  //   charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // } else if (charMap === "lower") {
  //   charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  // } else if (charMap === "numbers") {
  //   charset = "0123456789";
  // } else if (charMap === "special_char") {
  //   charset = "~`!@#$%^&*()_+-=[]{}|:'<>,.?/";
  // }

  for (let i = 0, n = charset.length; i < numberOfCharacters; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  let captcha = retVal;

  captcha_value = captcha;

  let canvas = document.getElementById(
    "captcha-canvas"
  ) as HTMLCanvasElement | null;
  if (!canvas) return;

  let ctx = canvas.getContext("2d");
  if (!ctx) return;

  let lineheight = 30;

  ctx.canvas.width = numberOfCharacters * 25;
  ctx.canvas.height = lineheight + 10;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textBaseline = "middle";
  ctx.font = "italic 20px Arial";
  ctx.fillStyle = fontColor;

  let num = 0;
  for (let i = 0; i < numberOfCharacters; i++) {
    num += 1;
    let x = 20 * num;
    let y = Math.round(Math.random() * (lineheight / 2)) + 10;
    ctx.fillText(retVal[i], x, y);
  }
};

export const validateCaptcha = (userValue: string, { reload = true }) => {
  if (userValue != captcha_value) {
    if (reload == true) {
      loadCaptcha();
    }
    return false;
  }
  return true;
};

export default function Captcha({}: {}) {
  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <div className="flex items-center">
      <canvas id="captcha-canvas"></canvas>
      <div
        className="flex w-8 h-8 ml-2 justify-center items-center cursor-pointer"
        onClick={() => loadCaptcha()}
      >
        <svg
          fill="#000000"
          height="20px"
          width="20px"
          viewBox="0 0 489.645 489.645"
        >
          <g>
            <path
              d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
		c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
		c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
		c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
		C414.856,432.511,548.256,314.811,460.656,132.911z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
