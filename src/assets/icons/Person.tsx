import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Person = (props: any) => {
  return (
    <Svg width={14} height={16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_412_1852)">
        <G clipPath="url(#prefix__clip1_412_1852)">
          <Path
            d="M9.5 4a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0zM3 4a4 4 0 118 0 4 4 0 01-8 0zM1.54 14.5h10.92A4.073 4.073 0 008.427 11H5.572a4.073 4.073 0 00-4.031 3.5zM0 15.072A5.57 5.57 0 015.572 9.5h2.856A5.57 5.57 0 0114 15.072a.928.928 0 01-.928.928H.928A.928.928 0 010 15.072z"
            fill="#9CA3AF"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_412_1852">
          <Path fill="#fff" d="M0 0h14v16H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1_412_1852">
          <Path d="M0 0h14v16H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

