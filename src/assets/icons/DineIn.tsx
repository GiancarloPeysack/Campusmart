import * as React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";

// Utility to create transparent or lighter shades
const applyAlpha = (hex: string, alpha: number) => {
  const parsed = hex.replace("#", "");
  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const DineIn = ({
  color = "#2563EB",
  bgColor,
  borderColor,
  ...props
}: {
  color?: string;
  bgColor?: string;
  borderColor?: string;
}) => {
  const background = bgColor ?? applyAlpha(color, 0.1); // Light background
  const border = borderColor ?? applyAlpha(color, 0.3);  // Soft border

  return (
    <Svg width={30} height={32} fill="none" {...props}>
      {/* Background */}
      <Path d="M22 0a8 8 0 018 8v16a8 8 0 01-8 8H8a8 8 0 01-8-8V8a8 8 0 018-8h14z" fill={background} />
      <Path d="M22 0a8 8 0 018 8v16a8 8 0 01-8 8H8a8 8 0 01-8-8V8a8 8 0 018-8h14z" stroke={border} />

      {/* Inner border */}
      <Path d="M22 25H8V8h14v17z" stroke="#E5E7EB" />

      <G clipPath="url(#clip0)">
        {/* Icon content */}
        <Path
          d="M21 8c-.5 0-4 1-4 5.5V17c0 1.103.897 2 2 2h1v4a.999.999 0 102 0V9c0-.553-.447-1-1-1zm-11 .5a.498.498 0 00-.447-.497.497.497 0 00-.54.388l-.947 4.259a2.75 2.75 0 002.434 3.338V23a.999.999 0 102 0v-7.012a2.752 2.752 0 002.434-3.338l-.946-4.26A.5.5 0 0013 8.5v4.194a.307.307 0 01-.613.025l-.39-4.263A.497.497 0 0011.5 8a.497.497 0 00-.497.456l-.387 4.263a.307.307 0 01-.613-.025V8.5H10zm1.51 4.75h-.02l.01-.022.01.022z"
          fill={color}
        />
      </G>

      <Defs>
        <ClipPath id="clip0">
          <Path d="M8 8h14v16H8V8z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
