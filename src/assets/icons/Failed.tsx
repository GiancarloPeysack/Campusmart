import * as React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";

export const Failed = (props: any) => {
  return (
    <Svg width={80} height={80} fill="none" {...props}>
      <Path
        d="M0 40C0 17.909 17.909 0 40 0s40 17.909 40 40-17.909 40-40 40S0 62.091 0 40z"
        fill="#FEE2E2"
      />
      <Path
        d="M0 40C0 17.909 17.909 0 40 0s40 17.909 40 40-17.909 40-40 40S0 62.091 0 40z"
        stroke="#E5E7EB"
      />
      <Path d="M22 22h36v36H22V22z" stroke="#E5E7EB" />
      <G clipPath="url(#prefix__clip0_39_2396)">
        <Path
          d="M40 58a18 18 0 100-36 18 18 0 000 36zm0-27c.935 0 1.688.752 1.688 1.688v7.874c0 .936-.753 1.688-1.688 1.688a1.683 1.683 0 01-1.688-1.688v-7.874c0-.936.753-1.688 1.688-1.688zm-2.25 15.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"
          fill="#EF4444"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_39_2396">
          <Path d="M22 22h36v36H22V22z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


