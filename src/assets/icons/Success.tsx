import * as React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";

export const Success = (props: any) => {
  return (
    <Svg width={80} height={80} fill="none" {...props}>
      <Path
        d="M0 40C0 17.909 17.909 0 40 0s40 17.909 40 40-17.909 40-40 40S0 62.091 0 40z"
        fill="#06F"
        fillOpacity={0.1}
      />
      <G clipPath="url(#prefix__clip0_39_1571)">
        <Path
          d="M55.089 29.41a2.253 2.253 0 010 3.186l-18 18a2.253 2.253 0 01-3.185 0l-9-9a2.253 2.253 0 013.185-3.185l7.41 7.404L51.912 29.41a2.253 2.253 0 013.185 0h-.007z"
          fill="#06F"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_39_1571">
          <Path d="M24.25 22h31.5v36h-31.5V22z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


