import * as React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

export const Success = (props: any) => {
  return (
    <Svg
      width={96}
      height={96}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M48 0C74.5097 0 96 21.4903 96 48C96 74.5097 74.5097 96 48 96C21.4903 96 0 74.5097 0 48C0 21.4903 21.4903 0 48 0Z"
        fill="#DCFCE7"
      />
      <Path
        d="M48 0C74.5097 0 96 21.4903 96 48C96 74.5097 74.5097 96 48 96C21.4903 96 0 74.5097 0 48C0 21.4903 21.4903 0 48 0Z"
        stroke="#E5E7EB"
      />
      <Path
        d="M63.75 66.5198H32.25V30.5198H63.75V66.5198Z"
        stroke="#E5E7EB"
      />
      <Defs>
        <ClipPath id="clip0_39_2138">
          <Rect x="32.25" y="31.2004" width="31.5" height="36" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_39_2138)">
        <Path
          d="M63.0891 38.6113C63.968 39.4902 63.968 40.9176 63.0891 41.7965L45.0891 59.7965C44.2102 60.6754 42.7828 60.6754 41.9039 59.7965L32.9039 50.7965C32.025 49.9176 32.025 48.4902 32.9039 47.6113C33.7828 46.7324 35.2102 46.7324 36.0891 47.6113L43.5 55.0152L59.911 38.6113C60.7899 37.7324 62.2172 37.7324 63.0961 38.6113H63.0891Z"
          fill="#22C55E"
        />
      </G>
    </Svg>
  );
};
